import refreshTokens from '../../../utils/refreshTokens.js';
import getIdOfService from '../../../utils/getIdOfService.js';
import { OAuthAccount } from '../../../models/oauthAccountsModel.js';
import { UserService } from '../../../models/userServiceModel.js';

import getAccessTokenGoogle from '../../../utils/getAccessToken.js';


const googleServiceId = await getIdOfService('Google');

/* Run function for send email with Google reaction */
async function run(area) {
    const userId = area.user_id;
    const actionForm = area?.config?.action?.datas_form || [];

    try {
        const accessToken = await getAccessTokenGoogle(area);
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }
        const emailTo = actionForm.find(f => f.fieldName === "Send to")?.response;
        const emailSubject = actionForm.find(f => f.fieldName === "Subject")?.response || '';
    } catch (error) {
        console.error('Error in Google send email reaction:', error);
        throw error;
    }
}

/* Export the run function */
export default { run };