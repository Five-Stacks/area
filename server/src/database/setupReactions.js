/* Import modules */
import { Reaction } from '../models/indexModel.js';
import getIdOfService from '../utils/getIdOfService.js';

/* Import timer action config */

import { timerReactionConfig } from './services/timer/timer.js';

/* Import google action config */

import { sendEmailGmailActionConfig } from './services/google/gmail.js';

/* End of imports */

/* Reaction setup function */
async function reactionsSetup() {
    const services = {
        'Timer': await getIdOfService('Timer'),
        'Google': await getIdOfService('Google'),
    };
    const reactions = [
        { service_id: services['Timer'], name: 'Timer', description: "Timer management", config: timerReactionConfig },
        { service_id: services['Google'], name: 'Send email with Gmail', description: "Send an email using Google", config: sendEmailGmailActionConfig }
    ];

    for (const reactionData of reactions) {
        const existingReaction = await Reaction.findOne({ where: { name: reactionData.name } });
        if (!existingReaction) {
            await Reaction.create(reactionData);
            console.log(`Reaction ${reactionData.name} added to the database.`);
        }
    }
}

/* Export setup function */
export default reactionsSetup;
