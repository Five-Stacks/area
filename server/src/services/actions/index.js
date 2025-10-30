/* Import modules */
import * as timer from "./timer.js";

/* Google Actions */
import * as googleEmailReceived from "./google/emailReceived.js";
import * as googleEventCreated from "./google/eventCreated.js";
import * as googleEventStarted from "./google/eventStarted.js";
import * as googleFileCreated from "./google/fileCreated.js";

/* Discord Actions */
import * as discordGuildJoined from "./discord/guildJoined.js";
import * as discordProfileChanged from "./discord/profileChanged.js";

/* Actions handler */
const actionsHandler = {
    'Timer': timer.default ?? timer,
    'Gmail received': googleEmailReceived.default ?? googleEmailReceived,
    'New Google Calendar event': googleEventCreated.default ?? googleEventCreated,
    'Google Calendar event started': googleEventStarted.default ?? googleEventStarted,
    'New Google Drive file': googleFileCreated.default ?? googleFileCreated,
    'Guild joined': discordGuildJoined.default ?? discordGuildJoined,
    'Profile changed': discordProfileChanged.default ?? discordProfileChanged
};

/* Export actions handler */
export default actionsHandler;
