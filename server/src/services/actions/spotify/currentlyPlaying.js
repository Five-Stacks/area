import getAccessToken from '../../../utils/getAccessToken.js';

async function check(area) {
    try {
        const accessToken = await getAccessToken(area, 'Spotify');
        if (!accessToken) {
            throw new Error('Unable to obtain Spotify access token.');
        }

        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 204) return false;
        if (!response.ok) {
            console.error('Spotify currently-playing API returned non-ok status', response.status);
            return false;
        }

        const data = await response.json();
        const item = data?.item;
        if (!item) return false;

        const actionForm = area?.config?.trigger?.datas_form || [];
        const keywordsRaw = actionForm.find(f => f.fieldName === 'Keyword(s)')?.response || '';
        const keywords = Array.isArray(keywordsRaw) ? keywordsRaw : (String(keywordsRaw).split(',').map(s => s.trim()).filter(Boolean));

        if (keywords.length === 0) return true;

        const haystack = (
            (item.name || '') + ' ' +
            (item.album?.name || '') + ' ' +
            (Array.isArray(item.artists) ? item.artists.map(a => a.name).join(' ') : '')
        ).toLowerCase();

        const match = keywords.map(k => k.toLowerCase()).some(k => haystack.includes(k));
        return match;
    } catch (error) {
        console.error('Error in Spotify currently playing action:', error);
        return false;
    }
}

/* Export check function */
export default { check };
