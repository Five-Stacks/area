/* Import modules */
import * as timer from "./timer.js";

/* Reactions handler */
const reactionsHandler = {
    'Timer': timer.default ?? timer
};

/* Export reactions handler */
export default reactionsHandler;
