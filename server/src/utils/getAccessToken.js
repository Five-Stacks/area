/* Import modules */
import { OAuthAccount, UserService } from '../models/indexModel.js';
import refreshTokens from './refreshTokens.js';
import getServiceId from './getServiceId.js';

/* Get access token for a service */
async function getAccessToken(area, serviceName) {
    const userId = area.user_id;
    try {
        const serviceId = await getServiceId(serviceName);
        if (!serviceId) {
            throw new Error(`${serviceName} service is not configured.`);
        }
        const userServiceLink = await UserService.findOne({
            where: {
                user_id: userId,
                service_id: serviceId
            }
        });
        if (!userServiceLink || !userServiceLink.oauth_account_id) {
            throw new Error(`No linked OAuth account for ${serviceName} service.`);
        }
        const oauthAccount = await OAuthAccount.findByPk(userServiceLink.oauth_account_id);
        if (!oauthAccount) {
            throw new Error(`No OAuth account found for ${serviceName} service.`);
        }
        let accessToken;
        switch (serviceName) {
            case 'Google':
                if (oauthAccount.refresh_token) {
                    accessToken = await refreshTokens.refreshTokenGoogle(oauthAccount);
                } else if (oauthAccount.access_token) {
                    accessToken = oauthAccount.access_token;
                } else {
                    throw new Error(`No access or refresh token available for ${serviceName}`);
                }
                break;
            case 'Microsoft':
                if (oauthAccount.refresh_token) {
                    accessToken = await refreshTokens.refreshTokenMicrosoft(oauthAccount);
                } else if (oauthAccount.access_token) {
                    accessToken = oauthAccount.access_token;
                } else {
                    throw new Error(`No access or refresh token available for ${serviceName}`);
                }
                break;
            case 'Github':
                if (oauthAccount.refresh_token) {
                    accessToken = await refreshTokens.refreshTokenGithub(oauthAccount);
                } else if (oauthAccount.access_token) {
                    accessToken = oauthAccount.access_token;
                } else {
                    throw new Error(`No access or refresh token available for ${serviceName}`);
                }
                break;
            case 'Spotify':
                if (oauthAccount.refresh_token) {
                    accessToken = await refreshTokens.refreshTokenSpotify(oauthAccount);
                } else if (oauthAccount.access_token) {
                    accessToken = oauthAccount.access_token;
                } else {
                    throw new Error(`No access or refresh token available for ${serviceName}`);
                }
                break;
            case 'Discord':
                if (oauthAccount.refresh_token) {
                    accessToken = await refreshTokens.refreshTokenDiscord(oauthAccount);
                } else if (oauthAccount.access_token) {
                    accessToken = oauthAccount.access_token;
                } else {
                    throw new Error(`No access or refresh token available for ${serviceName}`);
                }
                break;
            case 'Twitter':
                if (oauthAccount.refresh_token) {
                    accessToken = await refreshTokens.refreshTokenTwitter(oauthAccount);
                } else if (oauthAccount.access_token) {
                    accessToken = oauthAccount.access_token;
                } else {
                    throw new Error(`No access or refresh token available for ${serviceName}`);
                }
                break;
            default:
                throw new Error(`Unsupported service: ${serviceName}`);
        }
        return accessToken;
    } catch (error) {
        console.error(`Error getting ${serviceName} access token:`, error);
        return null;
    }
}

/* Export getAccessToken function */
export default getAccessToken;
