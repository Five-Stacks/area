import getAccessToken from '../../../utils/getAccessToken.js';

/* Run function for send email with Google reaction */
async function run(area) {
    const actionForm = area?.config?.action?.datas_form || [];

    try {
        const accessToken = await getAccessToken(area, 'Google');
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }
        const emailTo = actionForm.find(f => f.fieldName === "Send to")?.response;
        const emailSubject = actionForm.find(f => f.fieldName === "Subject")?.response || '';
        const emailBody = actionForm.find(f => f.fieldName === "Body")?.response || '';

        if (!emailTo || emailSubject === null || emailBody === null) {
            throw new Error('Missing email fields in action configuration.');
        }

        const emailLines = [];
        emailLines.push(`To: ${emailTo}`);
        emailLines.push('Content-Type: text/plain; charset="UTF-8"');
        emailLines.push('MIME-Version: 1.0');
        emailLines.push(`Subject: ${emailSubject}`);
        emailLines.push('');
        emailLines.push(emailBody);

        const email = emailLines.join('\r\n').trim();

        const encodedEmail = Buffer.from(email)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: encodedEmail
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to send email: ${errorData.error.message}`);
        }

        return `Email to ${emailTo} sent successfully at ${new Date().toISOString()}.`;
    } catch (error) {
        console.error('Error in Google send email reaction:', error);
        throw error;
    }
}

/* Export the run function */
export default { run };