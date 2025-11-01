import getAccessToken from '../../../utils/getAccessToken.js';

async function run(area, reactionEntry) {
    if (!reactionEntry) return 'No reaction entry provided.';
    const form = reactionEntry?.datas_form || [];
    const playlistField = form.find(f => f.fieldName === 'Playlist ID or URL');
    const playlistValue = playlistField?.response;
    if (!playlistValue) throw new Error('Missing playlist ID or URL in reaction configuration.');

    try {
        const accessToken = await getAccessToken(area, 'Spotify');
        if (!accessToken) {
            throw new Error('Unable to obtain Spotify access token.');
        }

        let playlistId = String(playlistValue).trim();
        const urlMatch = playlistId.match(/playlist[\/](?<id>[A-Za-z0-9_-]{22,})/);
        if (urlMatch && urlMatch.groups && urlMatch.groups.id) {
            playlistId = urlMatch.groups.id;
        }

        const uriMatch = playlistId.match(/^spotify:playlist:(?<id>[A-Za-z0-9_-]{22,})$/);
        if (uriMatch && uriMatch.groups && uriMatch.groups.id) {
            playlistId = uriMatch.groups.id;
        }

        if (!/^[A-Za-z0-9_-]{22}$/.test(playlistId)) {
            throw new Error('Invalid playlist ID format after extraction.');
        }

        const nowResp = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (nowResp.status === 204) {
            return 'No track currently playing.';
        }
        if (!nowResp.ok) {
            throw new Error('Failed to fetch currently playing track from Spotify.');
        }

        const nowData = await nowResp.json();
        const track = nowData?.item;
        if (!track || !track.uri) {
            return 'No currently playing track found.';
        }

        const posField = form.find(f => f.fieldName === 'Position');
        const position = posField ? Number(posField.response) : undefined;

        const body = { uris: [track.uri] };
        if (Number.isFinite(position)) {
            body.position = position;
        }

        const addResp = await fetch(`https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!addResp.ok) {
            const err = await addResp.text();
            throw new Error(`Failed to add track to playlist: ${err}`);
        }

        return `Track '${track.name}' added to playlist ${playlistId}.`;
    } catch (error) {
        console.error('Error in Spotify add current track to playlist reaction:', error);
        throw error;
    }
}

/* Export run function */
export default { run };
