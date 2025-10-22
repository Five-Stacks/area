async function getAccessTokenGoogle(area) {
    const userId = area.user_id;

    try {
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
    } catch (error) {
        console.error('Error getting Google access token:', error);
        return null;
    }
    return accessToken;
}

export default getAccessTokenGoogle;
