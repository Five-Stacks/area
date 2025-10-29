import getAccessToken from '../../../utils/getAccessToken.js';

async function check(area) {
    try {
        const accessToken = await getAccessToken(area, 'Google');
        if (!accessToken) {
            throw new Error('Unable to obtain Google access token.');
        }

        const oneMinuteAgoISO = new Date(Date.now() - 60_000).toISOString();
        const q = `createdTime > '${oneMinuteAgoISO}'`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,createdTime,mimeType)&pageSize=100`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Google Drive files.');
        }

        const data = await response.json();
        const items = data.files || [];
        const oneMinuteAgoMs = Date.now() - 60_000;
        let newFiles = [];

        for (const file of items) {
            const created = file.createdTime;
            if (!created) continue;
            const createdMs = new Date(created).getTime();
            if (createdMs >= oneMinuteAgoMs) {
                newFiles.push(file);
            }
        }

        if (newFiles.length === 0) return false;

        console.log(`Google Drive File Created action: Found ${newFiles.length} new files.`);

        const actionForm = area?.config?.trigger?.datas_form || [];
        const fileNameKeyword = actionForm.find(f => f.fieldName === "Name of the file keyword")?.response?.split(",") || [];

        newFiles = newFiles.filter(file => {
            const nameMatch = fileNameKeyword.length === 0 || fileNameKeyword.some(k => file.name?.includes(k.trim()));
            return nameMatch;
        });

        console.log(`Google Drive File Created action: ${newFiles.length} files match the keyword filter.`);

        return newFiles.length > 0;
    } catch (error) {
        console.error('Error in Google Drive File Created action:', error);
        return false;
    }
}

/* Export action */
export default { check };