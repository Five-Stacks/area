/* Import modules */
import * as timer from "./timer.js";

/* Actions handler */
const actionsHandler = {
    'timer': timer.default ?? timer
};

/* Export actions handler */
export default actionsHandler;
