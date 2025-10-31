/* Import modules */
import * as timer from "./timer/timer.js";

/* Import google reactions */
import * as googleSendEmail from "./google/sendEmail.js";
import * as googleCreateNewEvent from "./google/createNewEvent.js";
import * as spotifyAddCurrent from "./spotify/addCurrentTrackToPlaylist.js";

/* Reactions handler */
const reactionsHandler = {
    'Timer': timer.default ?? timer,
    'Send email with Gmail': googleSendEmail.default ?? googleSendEmail,
    'Create Google Calendar event': googleCreateNewEvent.default ?? googleCreateNewEvent
    , 'Add current Spotify track to playlist': spotifyAddCurrent.default ?? spotifyAddCurrent
};

/* Export reactions handler */
export default reactionsHandler;
