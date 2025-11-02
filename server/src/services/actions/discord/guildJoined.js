import getAccessToken from '../../../utils/getAccessToken.js';
import { Area } from '../../../models/indexModel.js';

async function check(area) {
    try {
        const accessToken = await getAccessToken(area, 'Discord');
        if (!accessToken) {
            throw new Error('Unable to obtain Discord access token for guild check.');
        }

        const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch Discord guilds:', errorText);
            throw new Error(`Failed to fetch Discord guilds: ${response.statusText}`);
        }

        const currentGuilds = await response.json();
        const currentGuildIds = new Set(currentGuilds.map(g => g.id));

        const triggerData = area.config?.trigger || {};
        const knownGuildIds = new Set(triggerData.known_guild_ids || []);

        if (knownGuildIds.size === 0) {
            triggerData.known_guild_ids = Array.from(currentGuildIds);
            await Area.update({ config: { ...area.config, trigger: triggerData } }, { where: { id: area.id } });
            return false;
        }

        let newGuildFound = false;
        for (const id of currentGuildIds) {
            if (!knownGuildIds.has(id)) {
                newGuildFound = true;
                break;
            }
        }

        if (newGuildFound) {
            triggerData.known_guild_ids = Array.from(currentGuildIds);
            await Area.update({ config: { ...area.config, trigger: triggerData } }, { where: { id: area.id } });
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in guildJoined check:', error);
        return false;
    }
}

export default { check };
