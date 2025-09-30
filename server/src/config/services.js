import { Service } from '../models/serviceModel.js';

const GITHUB_DESC = "Connect GitHub to react to repository activity and automate workflows. Triggers: new issues, PRs, comments, pushes, releases. Actions: create issues, comment on PRs/issues, open PRs, create releases, manage labels. OAuth scopes typically include repo/public_repo and read:org.";

const GOOGLE_DESC = "Integrate Google (Gmail, Calendar, Drive) to automate email, calendar and file workflows. Gmail triggers/actions (send, label, archive), Calendar events (create/update), Drive file ops (upload/share). OAuth scopes: gmail.*, calendar.events, drive.file.";

const DISCORD_DESC = "Connect Discord to automate community interactions. Triggers: messages, member joins, reactions. Actions: post messages, send DMs, create channels, assign roles, pin messages. Requires bot/oauth scopes appropriate for server actions.";

const SPOTIFY_DESC = "Automate Spotify actions based on listening and playlist events. Triggers: new saved tracks, playlist changes, followed artist releases. Actions: add tracks to playlists, create playlists, follow artists. OAuth scopes: user-library, playlist-modify."    ;

const TWITTER_DESC = "Monitor and post to Twitter (X). Triggers: new tweets, mentions, likes, follows. Actions: post tweets, reply, like, follow/unfollow, send DMs (if allowed). Requires tweet read/write and user scopes per API version."   ;

const MICROSOFT_DESC = "Automate Microsoft 365 (Outlook, OneDrive, Teams). Triggers: new emails, file uploads, Teams messages. Actions: send emails, upload/share files, post in Teams, create channels. OAuth scopes include mail, files, and Teams permissions.";

// Function to initialize services in the database
async function servicesSetup() {
    const services = [
        { name: 'github', description: GITHUB_DESC },
        { name: 'google', description: GOOGLE_DESC },
        { name: 'discord', description: DISCORD_DESC },
        { name: 'spotify', description: SPOTIFY_DESC },
        { name: 'twitter', description: TWITTER_DESC },
        { name: 'microsoft', description: MICROSOFT_DESC },
    ];

    for (const serviceData of services) {
        const existingService = await Service.findOne({ where: { name: serviceData.name } });
        if (!existingService) {
            await Service.create(serviceData);
            console.log(`Service ${serviceData.name} added to the database.`);
        }
    }
}

export default servicesSetup;