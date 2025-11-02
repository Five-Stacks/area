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

        const trackId = item.id || item.uri;
        if (!trackId) return false;

        const config = (area.config && typeof area.config === 'object') ? { ...area.config } : {};
        const prev = config._lastSpotifyTrackId;

        if (!prev) {
            config._lastSpotifyTrackId = trackId;
            try {
                await area.update({ config });
            } catch (e) {
                console.error('Failed to persist lastSpotifyTrackId on area:', e);
            }
            return false;
        }

        if (prev !== trackId) {
            config._lastSpotifyTrackId = trackId;
            try {
                await area.update({ config });
            } catch (e) {
                console.error('Failed to persist lastSpotifyTrackId on area:', e);
            }
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in Spotify track changed action:', error);
        return false;
    }
}

/* Export check function */
export default { check };
