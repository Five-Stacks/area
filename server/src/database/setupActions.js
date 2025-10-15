/* Import modules */
import { Action } from '../models/indexModel.js';

/* Action setup function */
async function actionsSetup() {
    const actions = [
        { service_id: 1, name: 'timer', description: "Timer management"}
    ];

    for (const actionData of actions) {
        const existingAction = await Action.findOne({ where: { name: actionData.name } });
        if (!existingAction) {
            await Action.create(actionData);
            console.log(`Action ${actionData.name} added to the database.`);
        }
    }
}

/* Export setup function */
export default actionsSetup;
