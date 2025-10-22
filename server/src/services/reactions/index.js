/* Import modules */
import * as timer from "./timer.js";

/* Import google reactions */
import * as googleSendEmail from "./google/sendEmail.js";

/* Reactions handler */
const reactionsHandler = {
    'Timer': timer.default ?? timer,
    'Send email with Gmail': googleSendEmail.default ?? googleSendEmail
};

/* Export reactions handler */
export default reactionsHandler;
