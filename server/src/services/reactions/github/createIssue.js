/* Import modules */
import getAccessToken from '../../../utils/getAccessToken.js';

/* Run create GitHub issue reaction */
async function run(area, reactionEntry) {
    try {
        const accessToken = await getAccessToken(area, 'Github');
        if (!accessToken) {
            throw new Error('Unable to obtain GitHub access token.');
        }

        const reactionForm = reactionEntry?.datas_form || [];
        const [owner, repo] = (reactionForm.find(f => f.fieldName === "Repository owner/repo (ex: FiveStack/AREA)")?.response || '').split('/').map(s => s.trim());
        const title = reactionForm.find(f => f.fieldName === "Title")?.response || 'No title provided';
        const body = reactionForm.find(f => f.fieldName === "Body")?.response || '';
        const labelsResponse = reactionForm.find(f => f.fieldName === "Labels")?.response || '';
        const labels = labelsResponse ? labelsResponse.split(',').map(label => label.trim()) : [];

        if (!owner || !repo) {
            throw new Error('Invalid repository format. Expected "owner/repo".');
        }

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                labels
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to create GitHub issue: ${error.message}`);
        }

        return 'GitHub issue created successfully.';
    } catch (error) {
        console.error('Error creating GitHub issue:', error);
        throw error;
    }
}

/* Export run function */
export default { run };
