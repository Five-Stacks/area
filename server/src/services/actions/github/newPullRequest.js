/* Import modules */
import getAccessToken from '../../../utils/getAccessToken.js';

/* Check for new GitHub pull requests action */
async function check(area) {
    try {
        const accessToken = await getAccessToken(area, 'Github');
        if (!accessToken) {
            throw new Error('Unable to obtain GitHub access token.');
        }

        const actionForm = area?.config?.trigger?.datas_form || [];
        const [owner, repo] = (actionForm.find(f => f.fieldName === "Repository owner/repo (ex: FiveStack/AREA)")?.response || '').split('/').map(s => s.trim());
        if (!owner || !repo) {
            throw new Error('Invalid repository format. Expected "owner/repo".');
        }

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch GitHub pull requests.');
        }

        const pullRequests = await response.json();
        const recentPRs = pullRequests.filter(pr => {
            const createdAt = new Date(pr.created_at).getTime();
            return (Date.now() - createdAt) <= 60_000;
        });

        if (recentPRs.length === 0) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking for new GitHub pull requests:', error);
        return false;
    }
}

/* Export check function */
export default { check };
