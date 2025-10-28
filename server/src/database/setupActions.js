/* Import modules */
import { Action } from '../models/indexModel.js';
import getIdOfService from '../utils/getIdOfService.js';

/* Action config */

/* Import timer action config */
import { timerActionConfig } from './services/timer/timer.js';

/* Import google action config */

import { googleEmailReceivedActionConfig } from './services/google/gmail.js';
import { eventCreatedGoogleActionConfig, eventStartedGoogleActionConfig } from './services/google/calendar.js';
import { fileCreatedGoogleActionConfig } from './services/google/drive.js';

/* Import microsoft action config */

import { outlookEmailReceivedActionConfig } from './services/microsoft/outlook.js';

/* End of imports */

/* Action setup function */
async function actionsSetup() {
    const services = {
        'Timer': await getIdOfService('Timer'),
        'Google': await getIdOfService('Google'),
        'Microsoft': await getIdOfService('Microsoft'),
    };

    const actions = [
        { service_id: services['Timer'], name: 'Timer', description: "Timer management", config: timerActionConfig },

        { service_id: services['Google'], name: 'Gmail received', description: "Triggered when a new email is received in Gmail", config: googleEmailReceivedActionConfig },
        { service_id: services['Google'], name: 'New Google Calendar event', description: "Triggered when a new event is created in Google Calendar", config: eventCreatedGoogleActionConfig },
        { service_id: services['Google'], name: 'Google Calendar event started', description: "Triggered when a Google Calendar event is starting", config: eventStartedGoogleActionConfig },
        { service_id: services['Google'], name: 'New Google Drive file', description: "Triggered when a new file is created in Google Drive", config: fileCreatedGoogleActionConfig },

        { service_id: services['Microsoft'], name: 'Outlook email received', description: "Triggered when a new email is received in Outlook", config: outlookEmailReceivedActionConfig },
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
