/* Import modules */
import { Action } from '../models/indexModel.js';
import getServiceId from '../utils/getServiceId.js';
import { timerActionConfig } from './services/timer/timer.js';
import { googleEmailReceivedActionConfig } from './services/google/gmail.js';
import { eventCreatedGoogleActionConfig, eventStartedGoogleActionConfig } from './services/google/calendar.js';
import { fileCreatedGoogleActionConfig } from './services/google/drive.js';
import { newIssueConfig, newPullRequestConfig, newStarConfig, newReleaseConfig } from './services/github/github.js';
import { spotifyCurrentlyPlayingActionConfig } from './services/spotify/spotify.js';

/* Action setup function */
async function actionsSetup() {
    const services = {
        'Timer': await getServiceId('Timer'),
        'Google': await getServiceId('Google'),
        'Github': await getServiceId('Github'),
        'Discord': await getServiceId('Discord'),
        'Spotify': await getServiceId('Spotify'),
        'Twitter': await getServiceId('Twitter'),
        'Microsoft': await getServiceId('Microsoft'),
    };

    const actions = [
        { service_id: services['Timer'], name: 'Timer', description: "Timer management", config: timerActionConfig },
        { service_id: services['Google'], name: 'Gmail received', description: "Triggered when a new email is received in Gmail", config: googleEmailReceivedActionConfig },
        { service_id: services['Google'], name: 'New Google Calendar event', description: "Triggered when a new event is created in Google Calendar", config: eventCreatedGoogleActionConfig },
        { service_id: services['Google'], name: 'Google Calendar event started', description: "Triggered when a Google Calendar event is starting", config: eventStartedGoogleActionConfig },
        { service_id: services['Google'], name: 'New Google Drive file', description: "Triggered when a new file is created in Google Drive", config: fileCreatedGoogleActionConfig },
        { service_id: services['Github'], name: 'New GitHub Issue', description: "Triggered when a new issue is created in a GitHub repository", config: newIssueConfig },
        { service_id: services['Github'], name: 'New GitHub Pull Request', description: "Triggered when a new pull request is created in a GitHub repository", config: newPullRequestConfig },
        { service_id: services['Github'], name: 'New Star on GitHub Repository', description: "Triggered when a GitHub repository receives a new star", config: newStarConfig },
        { service_id: services['Github'], name: 'New GitHub Release', description: "Triggered when a new release is published in a GitHub repository", config: newReleaseConfig },
        { service_id: services['Spotify'], name: 'Spotify now playing', description: "Triggered when a new track starts playing on Spotify", config: spotifyCurrentlyPlayingActionConfig },
        { service_id: services['Spotify'], name: 'Spotify track changed', description: "Triggered when the user's currently playing track changes", config: {} },
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
