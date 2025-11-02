/* Import modules */
import cron from "node-cron";
import { Action, Area, AreaExecution } from "../models/indexModel.js";
import actionsHandler from "./actions/index.js";
import reactionsHandler from "./reactions/index.js";

/* Execute areas function */
async function executeAreas() {
    const areas = await Area.findAll({
        where: { is_active: true },
        include: [
            { model: Action, as: 'action', attributes: ['name'] },
        ]
    });
    const areaTasks = areas.map(async (area) => {
        try {
            const action = actionsHandler[area.action?.name];
            if (!action?.check) {
                console.warn(`No action handler found for ${area.action?.name}`);
                return;
            }
            const isTriggered = await action.check(area);
            if (!isTriggered) return;
            const reactionsEntries = area?.config?.actions || [];
            for (const reactionEntry of reactionsEntries) {
                const reactionHandler = reactionsHandler[reactionEntry.name];
                if (!reactionHandler?.run) {
                    console.warn(`No reaction handler found for ${reactionEntry.name}`);
                    continue;
                }
                try {
                    const result = await reactionHandler.run(area, reactionEntry);
                    await AreaExecution.create({
                        area_id: area.id,
                        status: 'success',
                        log: result || `Reaction ${reactionEntry.name} executed successfully`
                    });
                } catch (error) {
                    console.error(`Error executing reaction ${reactionEntry.name} for area ${area.id}:`, error);
                    await AreaExecution.create({
                        area_id: area.id,
                        status: 'failed',
                        log: `Reaction ${reactionEntry.name} failed: ${error.message}`
                    });
                }
            }
        } catch (error) {
            console.error(`Error executing area ${area.id}:`, error);
            await AreaExecution.create({
                area_id: area.id,
                status: 'failed',
                log: error.message
            });
        }
    });

    await Promise.all(areaTasks);
}

/* Scheduler */
cron.schedule("* * * * *", async () => {
    await executeAreas();
});
