/* Import modules */
import cron from "node-cron";
import { Action, Reaction, Area, AreaExecution } from "../models/indexModel.js";
import actionsHandler from "./actions/index.js";
import reactionsHandler from "./reactions/index.js";

/* Execute areas function */
async function executeAreas() {
    const areas = await Area.findAll({
        where: { is_active: true },
        include: [
            { model: Action, as: 'action', attributes: ['name'] },
            { model: Reaction, as: 'reaction', attributes: ['name'] }
        ]
    });

    for (const area of areas) {
        try {
            const action = actionsHandler[area.action?.name];
            if (!action?.check) {
                console.warn(`No action handler found for ${area.action?.name}`);
                continue;
            }
            const isTriggered = await action.check(area);
            if (isTriggered) {
                const reaction = reactionsHandler[area.reaction?.name];
                if (!reaction?.run) {
                    console.warn(`No reaction handler found for ${area.reaction?.name}`);
                    continue;
                }
                const result = await reaction.run(area);
                await AreaExecution.create({
                    area_id: area.id,
                    status: 'success',
                    log: result || 'Reaction executed successfully'
                });
            }
        } catch (error) {
            console.error(`Error executing area ${area.id}:`, error);
            await AreaExecution.create({
                area_id: area.id,
                status: 'failed',
                log: error.message
            });
        }
    }
}

/* Scheduler */
cron.schedule("* * * * *", async () => {
    await executeAreas();
});
