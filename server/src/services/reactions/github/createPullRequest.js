/* Import modules */
import getAccessToken from '../../../utils/getAccessToken.js';

/* Run GitHub create pull request reaction */
async function run(area, reactionEntry) {
    try {
        const accessToken = await getAccessToken(area, 'Github');
        if (!accessToken) {
            throw new Error('Unable to obtain GitHub access token.');
        }

        const reactionForm = reactionEntry?.datas_form || [];
        const [owner, repo] = (reactionForm.find(f => f.fieldName === "Repository owner/repo (ex: FiveStack/AREA)")?.response || '').split('/').map(s => s.trim());
        const head = reactionForm.find(f => f.fieldName === "Head Branch (ex: feature/login-fix)")?.response || '';
        const base = reactionForm.find(f => f.fieldName === "Base Branch (ex: main)")?.response || '';
        const title = reactionForm.find(f => f.fieldName === "Title")?.response || 'No title provided';
        const body = reactionForm.find(f => f.fieldName === "Body")?.response || '';

        if (!owner || !repo) {
            throw new Error('Invalid repository format. Expected "owner/repo".');
        }

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                head,
                base,
                body
            })
        });

        if (!response.ok) {
            let errBody = null;
            try {
                errBody = await response.json();
            } catch (e) {
            }
            const details = errBody ? `${errBody.message || ''} ${errBody.errors ? JSON.stringify(errBody.errors) : ''}`.trim() : await response.text().catch(() => '<no-body>');
            throw new Error(`Failed to create GitHub pull request: ${response.status} ${response.statusText} - ${details}`);
        }

        return 'GitHub pull request created successfully.';
    } catch (error) {
        console.error('Error creating GitHub pull request:', error);
        throw error;
    }
}

/* Export run function */
export default { run };
