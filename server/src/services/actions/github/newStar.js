/* Import modules */
import getAccessToken from '../../../utils/getAccessToken.js';

/* Check for new GitHub stars action */
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

        // Request stargazers with timestamps by using the `star` preview media type
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/stargazers`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3.star+json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch GitHub stargazers.');
        }

        const stargazers = await response.json();
        const recentStars = stargazers.filter(star => {
            const timeStr = star.starred_at || star.created_at || star.updated_at;
            if (!timeStr) return false; // no timestamp available, can't consider it recent
            const starredAt = new Date(timeStr).getTime();
            return (Date.now() - starredAt) <= 60_000;
        });

        if (recentStars.length === 0) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking for new GitHub stars:', error);
        return false;
    }
}

/* Export check function */
export default { check };
