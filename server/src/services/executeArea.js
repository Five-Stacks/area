/*
 Service: executeArea

 This background service finds a user OAuthAccount for provider 'google',
 ensures an access token is available (refreshing it with the stored
 refresh_token if necessary), and sends an email from the user to themself
 every 5 seconds using the Gmail REST API. Implemented using node's https
 so no extra dependencies are required.

 Requirements / expectations:
 - Expects GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment.
 - Uses the OAuthAccount model (access_token, refresh_token) and User model.
 - Updates access_token in DB when refreshed.

 Note: import this module (it is started automatically by app.js) so the
 interval begins when the server starts.
*/

import https from 'https';
import querystring from 'querystring';
import { OAuthAccount } from '../models/oauthAccountsModel.js';
import { User } from '../models/userModel.js';

const INTERVAL_MS = 5000; // 5 seconds

let intervalHandle = null;

function httpPostJson(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      const data = typeof body === 'string' ? body : JSON.stringify(body);

      const opts = {
        method: 'POST',
        hostname: parsed.hostname,
        path: parsed.pathname + (parsed.search || ''),
        port: parsed.port || 443,
        headers: Object.assign({
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }, headers)
      };

      const req = https.request(opts, (res) => {
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => raw += chunk);
        res.on('end', () => {
          try {
            const parsed = raw ? JSON.parse(raw) : {};
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              const err = new Error(`HTTP ${res.statusCode} ${res.statusMessage} - ${JSON.stringify(parsed)}`);
              err.status = res.statusCode;
              err.body = parsed;
              reject(err);
            }
          } catch (err) {
            reject(err);
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(data);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

function httpPostForm(url, form) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      const data = querystring.stringify(form);

      const opts = {
        method: 'POST',
        hostname: parsed.hostname,
        path: parsed.pathname + (parsed.search || ''),
        port: parsed.port || 443,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
        }
      };

      const req = https.request(opts, (res) => {
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => raw += chunk);
        res.on('end', () => {
          try {
            const parsed = raw ? JSON.parse(raw) : {};
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsed);
            } else {
              const err = new Error(`HTTP ${res.statusCode} ${res.statusMessage}`);
              err.status = res.statusCode;
              err.body = parsed;
              reject(err);
            }
          } catch (err) {
            reject(err);
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(data);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

async function refreshAccessTokenIfNeeded(oauthAccount) {
  // If we have a refresh_token, try to refresh unconditionally before send
  if (!oauthAccount) return null;
  if (!oauthAccount.refresh_token) return oauthAccount.access_token;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.warn('GOOGLE_CLIENT_ID/SECRET not configured; cannot refresh token');
    return oauthAccount.access_token;
  }

  try {
    const tokenResp = await httpPostForm('https://oauth2.googleapis.com/token', {
      grant_type: 'refresh_token',
      refresh_token: oauthAccount.refresh_token,
      client_id: clientId,
      client_secret: clientSecret
    });

    if (tokenResp && tokenResp.access_token) {
      // persist new access_token and optionally expires_at
      try {
        await oauthAccount.update({
          access_token: tokenResp.access_token,
          expires_at: tokenResp.expires_in ? new Date(Date.now() + tokenResp.expires_in * 1000) : oauthAccount.expires_at
        });
      } catch (e) {
        // non-fatal
        console.warn('Failed updating oauthAccount after refresh:', e.message);
      }
      return tokenResp.access_token;
    }
  } catch (err) {
    console.warn('Failed to refresh access token:', err && err.message ? err.message : err);
  }
  return oauthAccount.access_token;
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sendGmail(accessToken, rawMessage) {
  const encoded = base64UrlEncode(rawMessage);
  const url = 'https://www.googleapis.com/gmail/v1/users/me/messages/send';
  const body = { raw: encoded };
  const headers = { Authorization: `Bearer ${accessToken}` };
  return httpPostJson(url, body, headers);
}

async function findGoogleOAuthAccount() {
  // Return any google OAuth account (we pick the first available)
  return await OAuthAccount.findOne({ where: { provider: 'google' } });
}

async function pickTargetAccount() {
  // Pick the first google oauth account that has an associated user
  const oauth = await OAuthAccount.findOne({ where: { provider: 'google' } });
  if (!oauth) return null;
  const user = await User.findByPk(oauth.user_id);
  if (!user) return null;
  return { oauth, user };
}

async function tick() {
  try {
    const pair = await pickTargetAccount();
    if (!pair) {
      console.log('[executeArea] no google oauth account/user found; skipping');
      return;
    }

    const { oauth, user } = pair;

    // Ensure we have a valid access token (refresh if possible)
    const accessToken = await refreshAccessTokenIfNeeded(oauth) || oauth.access_token;
    if (!accessToken) {
      console.log('[executeArea] no access token available for user', user.email);
      return;
    }

    const now = new Date().toISOString();
    const rawMessage = `From: ${user.email}\r\nTo: ${user.email}\r\nSubject: Automated ping from executeArea\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\nHello ${user.name || user.email}, this is an automated ping from executeArea at ${now}`;

    const res = await sendGmail(accessToken, rawMessage);
    console.log(`[executeArea] sent ping to ${user.email} id=${res && res.id ? res.id : 'unknown'}`);
  } catch (err) {
    console.warn('[executeArea] error during tick:', err && err.message ? err.message : err);
  }
}

function start() {
  if (intervalHandle) return; // already started
  console.log('[executeArea] starting background mailer (every', INTERVAL_MS, 'ms)');
  // Run immediately and then at interval
  tick();
  intervalHandle = setInterval(tick, INTERVAL_MS);
}

function stop() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
    console.log('[executeArea] stopped');
  }
}

export default { start, stop };
