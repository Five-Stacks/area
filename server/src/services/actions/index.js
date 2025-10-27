/* Import modules */
import * as timer from "./timer.js";

/* Google Actions */
import * as googleEmailReceived from "./google/emailReceived.js";
import * as googleEventCreated from "./google/eventCreated.js";
import * as googleEventStarted from "./google/eventStarted.js";

/* Actions handler */
const actionsHandler = {
    'Timer': timer.default ?? timer,
    'Gmail received': googleEmailReceived.default ?? googleEmailReceived,
    'New Google Calendar event': googleEventCreated.default ?? googleEventCreated,
    'Google Calendar event started': googleEventStarted.default ?? googleEventStarted,
};

/* Export actions handler */
export default actionsHandler;
