/* Import modules */
import { Reaction } from '../models/indexModel.js';
import getServiceId from '../utils/getServiceId.js';
import { timerReactionConfig } from './services/timer/timer.js';
import { sendEmailGmailReactionConfig } from './services/google/gmail.js';
import { createNewEventGoogleReactionConfig } from './services/google/calendar.js';
import { createIssueConfig, createPullRequestConfig, starRepositoryConfig, createReleaseConfig } from './services/github/github.js';

/* Reaction setup function */
async function reactionsSetup() {
    const services = {
        'Timer': await getServiceId('Timer'),
        'Google': await getServiceId('Google'),
        'Github': await getServiceId('Github'),
        'Discord': await getServiceId('Discord'),
        'Spotify': await getServiceId('Spotify'),
        'Twitter': await getServiceId('Twitter'),
        'Microsoft': await getServiceId('Microsoft'),
    };

    const reactions = [
        { service_id: services['Timer'], name: 'Timer', description: "Timer management", config: timerReactionConfig },
        { service_id: services['Google'], name: 'Send email with Gmail', description: "Send an email using Google", config: sendEmailGmailReactionConfig },
        { service_id: services['Google'], name: 'Create Google Calendar event', description: "Create a new event in Google Calendar", config: createNewEventGoogleReactionConfig },
        { service_id: services['Github'], name: 'Create GitHub Issue', description: "Create a new issue in a GitHub repository", config: createIssueConfig },
        { service_id: services['Github'], name: 'Create GitHub Pull Request', description: "Create a new pull request in a GitHub repository", config: createPullRequestConfig },
        { service_id: services['Github'], name: 'Star GitHub Repository', description: "Star a GitHub repository", config: starRepositoryConfig },
        { service_id: services['Github'], name: 'Create GitHub Release', description: "Create a new release in a GitHub repository", config: createReleaseConfig },
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
