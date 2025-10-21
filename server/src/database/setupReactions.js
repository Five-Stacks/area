/* Import modules */
import { Reaction } from '../models/indexModel.js';

/* Reaction config */
const timerReactionConfig = {
    "fields": [
        {
            "id": 1,
            "name": "Duration (minutes)",
            "title": "Duration (minutes)",
            "input_field": {
                "placeholder": "30"
            }
        }
    ]
};

/* Reaction setup function */
async function reactionsSetup() {
    const reactions = [
        { service_id: 1, name: 'Timer', description: "Timer management", config: timerReactionConfig }
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
