import { OAuthAccount } from '../models/oauthAccountsModel.js';
import { UserService } from '../models/userServiceModel.js';
import refreshTokens from './refreshTokens.js';
import getIdOfService from './getIdOfService.js';

async function getAccessTokenGoogle(area, googleServiceId = null) {
    const userId = area.user_id;

    try {
        if (!googleServiceId) {
            googleServiceId = await getIdOfService('Google');
        }

        if (!googleServiceId) {
            throw new Error('Google service is not configured.');
        }

        const userServiceLink = await UserService.findOne({
            where: {
                user_id: userId,
                service_id: googleServiceId
            }
        });
        if (!userServiceLink || !userServiceLink.oauth_account_id) {
            throw new Error('No linked OAuth account for Google service.');
        }

        const oauthAccount = await OAuthAccount.findByPk(userServiceLink.oauth_account_id);
        if (!oauthAccount) {
            throw new Error('No OAuth account found for Google service.');
        }

        const accessToken = await refreshTokens.refreshTokenGoogle(oauthAccount);

        return accessToken;
    } catch (error) {
        console.error('Error getting Google access token:', error);
        return null;
    }
}

export default getAccessTokenGoogle;
