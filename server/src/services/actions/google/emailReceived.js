import getAccessToken from '../../../utils/getAccessToken.js';

async function check(area) {
    try {
        const accessToken = await getAccessToken(area, 'Google');
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }

        const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Gmail messages.');
        }

        const data = await response.json();

        let newEmails = [];

        for (const message of data.messages || []) {
            const messageResponse = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!messageResponse.ok) {
                throw new Error('Failed to fetch Gmail message details.');
            }

            const clone = messageResponse.clone();
            const tempData = await clone.json();

            let timestamp;
            if (tempData && tempData.internalDate) {
                timestamp = Number(tempData.internalDate);
            } else {
                const dateHeader = tempData?.payload?.headers?.find(h => h.name.toLowerCase() === 'date')?.value;
                timestamp = dateHeader ? Date.parse(dateHeader) : NaN;
            }

            if (Number.isNaN(timestamp) || (Date.now() - timestamp) > 60_000) {
                continue;
            }

            const messageData = await messageResponse.json();
            newEmails.push(messageData);
        }

        if (newEmails.length === 0) {
            return false;
        }

        const actionForm = area?.config?.trigger?.datas_form || [];
        const listSenders = actionForm.find(f => f.fieldName === "List of senders")?.response.split(",") || [];
        if (listSenders.length > 0 && listSenders[0] !== "None") {
            newEmails = newEmails.filter(email => {
                const fromHeader = email?.payload?.headers?.find(h => h.name.toLowerCase() === 'from')?.value || '';
                return listSenders.some(sender => fromHeader.includes(sender.trim()));
            });
        }
        const subjectKeyword = actionForm.find(f => f.fieldName === "Subject keywords")?.response.split(",") || [];
        if (subjectKeyword.length > 0 && subjectKeyword[0] !== "None") {
            newEmails = newEmails.filter(email => {
                const subjectHeader = email?.payload?.headers?.find(h => h.name.toLowerCase() === 'subject')?.value || '';
                return subjectKeyword.some(keyword => subjectHeader.includes(keyword.trim()));
            });
        }
        const bodyKeyword = actionForm.find(f => f.fieldName === "Body keywords")?.response.split(",") || [];
        const decodeBase64Url = (input) => {
            if (!input) return '';
            let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4 !== 0) base64 += '=';
            try {
                return Buffer.from(base64, 'base64').toString('utf8');
            } catch (e) {
                return '';
            }
        };

        const extractBodyText = (payload) => {
            if (!payload) return '';
            if (payload.body && payload.body.data) {
                return decodeBase64Url(payload.body.data);
            }
            const parts = Array.isArray(payload.parts) ? payload.parts : [];
            const stack = [...parts];
            let texts = [];

            while (stack.length) {
                const part = stack.shift();
                if (!part) continue;
                if (part.body && part.body.data) {
                    texts.push(decodeBase64Url(part.body.data));
                }
                if (Array.isArray(part.parts) && part.parts.length > 0) {
                    stack.push(...part.parts);
                }
            }

            return texts.join('\n');
        };

        if (bodyKeyword.length > 0 && bodyKeyword[0] !== "None") {
            const keywords = bodyKeyword.map(k => k.trim().toLowerCase()).filter(Boolean);
            newEmails = newEmails.filter(email => {
                const payload = email?.payload;
                const bodyText = extractBodyText(payload).toLowerCase();
                return keywords.some(keyword => bodyText.includes(keyword));
            });
        }
        return newEmails.length > 0;
    } catch (error) {
        console.error('Error checking Gmail messages:', error);
        throw error;
    }
}

export default { check };
