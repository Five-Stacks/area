/* Import modules */
import * as timer from "./timer/timer.js";
import * as googleEmailReceived from "./google/emailReceived.js";
import * as googleEventCreated from "./google/eventCreated.js";
import * as googleEventStarted from "./google/eventStarted.js";
import * as googleFileCreated from "./google/fileCreated.js";

/* Google Actions */
import * as googleEmailReceived from "./google/emailReceived.js";
import * as googleEventCreated from "./google/eventCreated.js";
import * as googleEventStarted from "./google/eventStarted.js";
import * as googleFileCreated from "./google/fileCreated.js";

/* Actions handler */
const actionsHandler = {
    'Timer': timer.default ?? timer,
    'Gmail received': googleEmailReceived.default ?? googleEmailReceived,
    'New Google Calendar event': googleEventCreated.default ?? googleEventCreated,
    'Google Calendar event started': googleEventStarted.default ?? googleEventStarted,
    'New Google Drive file': googleFileCreated.default ?? googleFileCreated,
};

/* Export actions handler */
export default actionsHandler;
