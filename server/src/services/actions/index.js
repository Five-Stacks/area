/* Import modules */
import * as timer from "./timer.js";

/* Google Actions */
import * as googleEmailReceived from "./google/emailReceived.js";

/* Actions handler */
const actionsHandler = {
    'Timer': timer.default ?? timer,
    'Gmail received': googleEmailReceived.default ?? googleEmailReceived
};

/* Export actions handler */
export default actionsHandler;
