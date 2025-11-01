/* Import modules */
import getAccessToken from '../../../utils/getAccessToken.js';

/* Run GitHub create release reaction */
async function run(area, reactionEntry) {
    try {
        const accessToken = await getAccessToken(area, 'Github');
        if (!accessToken) {
            throw new Error('Unable to obtain GitHub access token.');
        }

        const reactionForm = reactionEntry?.datas_form || [];
        const [owner, repo] = (reactionForm.find(f => f.fieldName === "Repository owner/repo (ex: FiveStack/AREA)")?.response || '').split('/').map(s => s.trim());
        const tagName = reactionForm.find(f => f.fieldName === "Tag Name (ex: v1.2.3)")?.response || '';
        const releaseName = reactionForm.find(f => f.fieldName === "Release Name")?.response || '';
        const body = reactionForm.find(f => f.fieldName === "Release Description")?.response || '';
        const draft = reactionForm.find(f => f.fieldName === "Draft")?.response === 'true';
        const prerelease = reactionForm.find(f => f.fieldName === "Prerelease")?.response === 'true';

        if (!owner || !repo) {
            throw new Error('Invalid repository format. Expected "owner/repo".');
        }

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tag_name: tagName,
                name: releaseName,
                body,
                draft,
                prerelease
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to create GitHub release: ${error.message}`);
        }

        return 'GitHub release created successfully.';
    } catch (error) {
        console.error('Error creating GitHub release:', error);
        throw error;
    }
}

/* Export run function */
export default { run };
