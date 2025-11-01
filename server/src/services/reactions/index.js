/* Import modules */
import * as googleSendEmail from "./google/sendEmail.js";
import * as googleCreateNewEvent from "./google/createNewEvent.js";
import * as timer from "./timer/timer.js";
import * as githubCreateIssue from "./github/createIssue.js";
import * as githubCreatePullRequest from "./github/createPullRequest.js";
import * as githubStarRepository from "./github/starRepository.js";
import * as githubCreateRelease from "./github/createRelease.js";
import * as spotifyAddCurrent from "./spotify/addCurrentTrackToPlaylist.js";

/* Reactions handler */
const reactionsHandler = {
    'Timer': timer.default ?? timer,
    'Send email with Gmail': googleSendEmail.default ?? googleSendEmail,
    'Create Google Calendar event': googleCreateNewEvent.default ?? googleCreateNewEvent,
    'Create GitHub Issue': githubCreateIssue.default ?? githubCreateIssue,
    'Create GitHub Pull Request': githubCreatePullRequest.default ?? githubCreatePullRequest,
    'Star GitHub Repository': githubStarRepository.default ?? githubStarRepository,
    'Create GitHub Release': githubCreateRelease.default ?? githubCreateRelease,
    'Add current Spotify track to playlist': spotifyAddCurrent.default ?? spotifyAddCurrent
};

/* Export reactions handler */
export default reactionsHandler;
