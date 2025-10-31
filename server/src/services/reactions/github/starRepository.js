/* Import modules */
import getAccessToken from '../../../utils/getAccessToken.js';

/* Run GitHub star repository reaction */
async function run(area, reactionEntry) {
    try {
        const accessToken = await getAccessToken(area, 'Github');
        if (!accessToken) {
            throw new Error('Unable to obtain GitHub access token.');
        }

        const reactionForm = reactionEntry?.datas_form || [];
        const [owner, repo] = (reactionForm.find(f => f.fieldName === "Repository owner/repo (ex: FiveStack/AREA)")?.response || '').split('/').map(s => s.trim());

        if (!owner || !repo) {
            throw new Error('Invalid repository format. Expected "owner/repo".');
        }

        const response = await fetch(`https://api.github.com/user/starred/${owner}/${repo}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Length': '0'
            }
        });

        if (response.status !== 204) {
            const error = await response.json();
            throw new Error(`Failed to star GitHub repository: ${error.message}`);
        }

        return 'GitHub repository starred successfully.';
    } catch (error) {
        console.error('Error starring GitHub repository:', error);
        throw error;
    }
}

/* Export run function */
export default { run };
