import getAccessToken from '../../../utils/getAccessToken.js';
import { Area } from '../../../models/indexModel.js';

async function check(area) {
    try {
        const accessToken = await getAccessToken(area, 'Discord');
        if (!accessToken) {
            throw new Error('Unable to obtain Discord access token for profile check.');
        }

        const response = await fetch('https://discord.com/api/v10/users/@me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!response.ok) {
            const err = await response.text().catch(() => '<no-body>');
            console.error('Failed to fetch Discord user profile:', response.status, response.statusText, err);
            return false;
        }

        const profile = await response.json();

        const triggerData = area.config?.trigger || {};
        const stored = triggerData.profile_snapshot || {};

        const currentSnapshot = {
            id: profile.id,
            username: profile.username || null,
            discriminator: profile.discriminator || null,
            avatar: profile.avatar || null
        };

        if (!stored || !stored.id) {
            triggerData.profile_snapshot = currentSnapshot;
            await Area.update({ config: { ...area.config, trigger: triggerData } }, { where: { id: area.id } });
            return false;
        }

        const usernameChanged = stored.username !== currentSnapshot.username || stored.discriminator !== currentSnapshot.discriminator;
        const avatarChanged = stored.avatar !== currentSnapshot.avatar;

        console.log(`Discord profile check for area ${area.id}: usernameChanged=${usernameChanged}, avatarChanged=${avatarChanged}`);

        if (usernameChanged || avatarChanged) {
            triggerData.profile_snapshot = currentSnapshot;
            await Area.update({ config: { ...area.config, trigger: triggerData } }, { where: { id: area.id } });
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in profileChanged check:', error);
        return false;
    }
}

export default { check };