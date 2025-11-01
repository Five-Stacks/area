/* Import modules */
import * as googleEmailReceived from "./google/emailReceived.js";
import * as googleEventCreated from "./google/eventCreated.js";
import * as googleEventStarted from "./google/eventStarted.js";
import * as googleFileCreated from "./google/fileCreated.js";
import * as timerEveryX from "./timer/everyXMinutes.js";
import * as timer from "./timer/timer.js";
import * as spotifyCurrentlyPlaying from "./spotify/currentlyPlaying.js";
import * as spotifyTrackChanged from "./spotify/trackChanged.js";
import * as githubNewIssue from "./github/newIssue.js";
import * as githubNewPullRequest from "./github/newPullRequest.js";
import * as githubNewStar from "./github/newStar.js";
import * as githubNewRelease from "./github/newRelease.js";

/* Discord Actions */
import * as discordGuildJoined from "./discord/guildJoined.js";
import * as discordProfileChanged from "./discord/profileChanged.js";

/* Actions handler */
const actionsHandler = {
    'Timer': timer.default ?? timer,
    'Timer every X minutes': timerEveryX.default ?? timerEveryX,
    'Gmail received': googleEmailReceived.default ?? googleEmailReceived,
    'New Google Calendar event': googleEventCreated.default ?? googleEventCreated,
    'Google Calendar event started': googleEventStarted.default ?? googleEventStarted,
    'New Google Drive file': googleFileCreated.default ?? googleFileCreated,
    'New GitHub Issue': githubNewIssue.default ?? githubNewIssue,
    'New GitHub Pull Request': githubNewPullRequest.default ?? githubNewPullRequest,
    'New Star on GitHub Repository': githubNewStar.default ?? githubNewStar,
    'New GitHub Release': githubNewRelease.default ?? githubNewRelease,
    'Spotify now playing': spotifyCurrentlyPlaying.default ?? spotifyCurrentlyPlaying,
    'Spotify track changed': spotifyTrackChanged.default ?? spotifyTrackChanged,
    'Guild (discord server) joined': discordGuildJoined.default ?? discordGuildJoined,
    'Profile changed': discordProfileChanged.default ?? discordProfileChanged
};

/* Export actions handler */
export default actionsHandler;
