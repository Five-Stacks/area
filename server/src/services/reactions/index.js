/* Import modules */
import * as timer from "./timer.js";

/* Reactions handler */
const reactionsHandler = {
    'timer': timer.default ?? timer
};

/* Export reactions handler */
export default reactionsHandler;
