/* Import modules */
import 'dotenv/config';

/* Refresh token for Google */
async function refreshTokenGoogle(oauthAccount) {
    if (!oauthAccount || !oauthAccount.refresh_token) {
        throw new Error('No refresh token available');
    }
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Google client ID or secret not set in environment variables');
    }
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', oauthAccount.refresh_token);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!tokenResponse.ok) {
            const text = await tokenResponse.text().catch(() => '<no-body>');
            const err = new Error(`Failed to refresh token: ${tokenResponse.status} ${tokenResponse.statusText} - ${text}`);
            console.error('Google token refresh response error:', tokenResponse.status, tokenResponse.statusText, text);
            throw err;
        }
        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        console.error('Error refreshing Google token:', error);
        throw error;
    }
}

/* Refresh token for Microsoft */
async function refreshTokenMicrosoft(oauthAccount) {
    if (!oauthAccount || !oauthAccount.refresh_token) {
        throw new Error('No refresh token available');
    }
    const clientId = process.env.MICROSOFT_CLIENT_ID;
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Microsoft client ID or secret not set in environment variables');
    }
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', oauthAccount.refresh_token);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!tokenResponse.ok) {
            const text = await tokenResponse.text().catch(() => '<no-body>');
            console.error('Microsoft token refresh response error:', tokenResponse.status, tokenResponse.statusText, text);
            throw new Error(`Failed to refresh token: ${tokenResponse.status} ${tokenResponse.statusText} - ${text}`);
        }
        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        console.error('Error refreshing Microsoft token:', error);
        throw error;
    }
}

/* Refresh token for Spotify */
async function refreshTokenSpotify(oauthAccount) {
    if (!oauthAccount || !oauthAccount.refresh_token) {
        throw new Error('No refresh token available');
    }
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Spotify client ID or secret not set in environment variables');
    }
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', oauthAccount.refresh_token);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!tokenResponse.ok) {
            const text = await tokenResponse.text().catch(() => '<no-body>');
            console.error('Spotify token refresh response error:', tokenResponse.status, tokenResponse.statusText, text);
            throw new Error(`Failed to refresh token: ${tokenResponse.status} ${tokenResponse.statusText} - ${text}`);
        }
        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        console.error('Error refreshing Spotify token:', error);
        throw error;
    }
}

/* Refresh token for Github */
async function refreshTokenGithub(oauthAccount) {
    if (!oauthAccount || !oauthAccount.refresh_token) {
        throw new Error('No refresh token available');
    }
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('GitHub client ID or secret not set in environment variables');
    }
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', oauthAccount.refresh_token);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: params.toString(),
        });
        if (!tokenResponse.ok) {
            const text = await tokenResponse.text().catch(() => '<no-body>');
            console.error('GitHub token refresh response error:', tokenResponse.status, tokenResponse.statusText, text);
            throw new Error(`Failed to refresh token: ${tokenResponse.status} ${tokenResponse.statusText} - ${text}`);
        }
        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        console.error('Error refreshing GitHub token:', error);
        throw error;
    }
}

/* Refresh token for Twitter */
async function refreshTokenTwitter(oauthAccount) {
    if (!oauthAccount || !oauthAccount.refresh_token) {
        throw new Error('No refresh token available');
    }
    const clientId = process.env.TWITTER_CLIENT_ID;
    const clientSecret = process.env.TWITTER_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Twitter client ID or secret not set in environment variables');
    }
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', oauthAccount.refresh_token);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        const tokenResponse = await fetch('https://api.twitter.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!tokenResponse.ok) {
            const text = await tokenResponse.text().catch(() => '<no-body>');
            console.error('Twitter token refresh response error:', tokenResponse.status, tokenResponse.statusText, text);
            throw new Error(`Failed to refresh token: ${tokenResponse.status} ${tokenResponse.statusText} - ${text}`);
        }
        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        console.error('Error refreshing Twitter token:', error);
        throw error;
    }
}

/* Refresh token for Discord */
async function refreshTokenDiscord(oauthAccount) {
    if (!oauthAccount || !oauthAccount.refresh_token) {
        throw new Error('No refresh token available');
    }
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Discord client ID or secret not set in environment variables');
    }
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', oauthAccount.refresh_token);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!tokenResponse.ok) {
            const text = await tokenResponse.text().catch(() => '<no-body>');
            console.error('Discord token refresh response error:', tokenResponse.status, tokenResponse.statusText, text);
            throw new Error(`Failed to refresh token: ${tokenResponse.status} ${tokenResponse.statusText} - ${text}`);
        }
        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        console.error('Error refreshing Discord token:', error);
        throw error;
    }
}

/* Export refresh token functions */
export default {
    refreshTokenGoogle,
    refreshTokenMicrosoft,
    refreshTokenSpotify,
    refreshTokenGithub,
    refreshTokenTwitter,
    refreshTokenDiscord
};
