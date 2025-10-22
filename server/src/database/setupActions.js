/* Import modules */
import { Action } from '../models/indexModel.js';

/* Action config */

/* Import timer action config */
import { timerActionConfig } from './services/timer/timer.js';

/* Import google action config */

import { googleEmailReceivedActionConfig } from './services/google/gmail.js';

/* End of imports */

/* Action setup function */
async function actionsSetup() {
    const actions = [
        { service_id: 1, name: 'Timer', description: "Timer management", config: timerActionConfig },
        { service_id: 2, name: 'Gmail received', description: "Triggered when a new email is received in Gmail", config: googleEmailReceivedActionConfig },
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
