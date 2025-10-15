/* Import modules */
import sequelize from "../config/sequelize.js";
import servicesSetup from "./setupServices.js";
import actionsSetup from "./setupActions.js";
import reactionsSetup from "./setupReactions.js";

/* Wait for database connection */
async function waitForDatabase({ maxRetries = 30, retryDelay = 2000 } = {}) {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            await sequelize.authenticate();
            return;
        } catch (error) {
            console.error(`Database connection failed (attempt ${retries + 1}/${maxRetries})`);
            retries++;
            if (retries >= maxRetries) {
                throw new Error("Max retries reached. Could not connect to the database.");
            }
            await new Promise(res => setTimeout(res, retryDelay));
        }
    }
}

/* Setup database */
async function setupDatabase() {
    try {
        await waitForDatabase({
            maxRetries: 30,
            retryDelay: 2000,
        });
        await servicesSetup();
        await actionsSetup();
        await reactionsSetup();
    } catch (error) {
        console.error("Database setup failed:", error);
        process.exit(1);
    }
}

/* Export setup function */
export default setupDatabase;
