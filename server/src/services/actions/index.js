/* Import modules */
import * as timer from "./timer/timer.js";
import * as googleEmailReceived from "./google/emailReceived.js";
import * as googleEventCreated from "./google/eventCreated.js";
import * as googleEventStarted from "./google/eventStarted.js";
import * as googleFileCreated from "./google/fileCreated.js";
import * as githubNewIssue from "./github/newIssue.js";
import * as githubNewPullRequest from "./github/newPullRequest.js";
import * as githubNewStar from "./github/newStar.js";
import * as githubNewRelease from "./github/newRelease.js";

/* Actions handler */
const actionsHandler = {
    'Timer': timer.default ?? timer,
    'Gmail received': googleEmailReceived.default ?? googleEmailReceived,
    'New Google Calendar event': googleEventCreated.default ?? googleEventCreated,
    'Google Calendar event started': googleEventStarted.default ?? googleEventStarted,
    'New Google Drive file': googleFileCreated.default ?? googleFileCreated,
    'New GitHub Issue': githubNewIssue.default ?? githubNewIssue,
    'New GitHub Pull Request': githubNewPullRequest.default ?? githubNewPullRequest,
    'New Star on GitHub Repository': githubNewStar.default ?? githubNewStar,
    'New GitHub Release': githubNewRelease.default ?? githubNewRelease,
};

/* Export actions handler */
export default actionsHandler;
