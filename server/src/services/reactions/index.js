/* Import modules */
import * as timer from "./timer/timer.js";
import * as googleSendEmail from "./google/sendEmail.js";
import * as googleCreateNewEvent from "./google/createNewEvent.js";

/* Import google reactions */
import * as googleSendEmail from "./google/sendEmail.js";
import * as googleCreateNewEvent from "./google/createNewEvent.js";

/* Reactions handler */
const reactionsHandler = {
    'Timer': timer.default ?? timer,
    'Send email with Gmail': googleSendEmail.default ?? googleSendEmail,
    'Create Google Calendar event': googleCreateNewEvent.default ?? googleCreateNewEvent
};

/* Export reactions handler */
export default reactionsHandler;
