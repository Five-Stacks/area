/* Import modules */
import { Reaction } from '../models/indexModel.js';

/* Reaction setup function */
async function reactionsSetup() {
    const reactions = [
        { service_id: 1, name: 'timer', description: "Timer management"}
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
