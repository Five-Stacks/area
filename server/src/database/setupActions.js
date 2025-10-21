/* Import modules */
import { Action } from '../models/indexModel.js';

/* Action config */
const timerActionConfig = {
    "fields": [
        {
            "id": 1,
            "name": "Day of the Week",
            "title": "Day of the Week",
            "options_field": {
                "values": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            }
        },
        {
            "id": 2,
            "name": "Time (HH:MM)",
            "title": "Time (HH:MM)",
            "input_field": {
                "placeholder": "09:00"
            }
        }
    ]
};

/* Action setup function */
async function actionsSetup() {
    const actions = [
        { service_id: 1, name: 'Timer', description: "Timer management", config: timerActionConfig }
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
