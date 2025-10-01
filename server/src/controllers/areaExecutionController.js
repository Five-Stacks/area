/* Import modules */
import { AreaExecution } from '../models/areaExecutionModel.js';
import { Area } from '../models/areaModel.js';

/* Controller to get all area executions for the current user */
const getAllCurrentUser = async (req, res) => {
    try {
        const userAreas = await Area.findAll({ where: { user_id: req.user.userId } });
        const areaIds = userAreas.map(area => area.id);
        const areaExecutions = await AreaExecution.findAll({ where: { area_id: areaIds } });
        res.status(200).json({ success: true, data: areaExecutions });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Controller to get an area execution by ID */
const getById = async (req, res) => {
    try {
        const areaId = req.params.id;
        const area = await Area.findOne({ where: { id: areaId, user_id: req.user.userId } });
        if (!area) {
            return res.status(404).json({ success: false, error: 'Area not found' });
        }
        const areaExecution = await AreaExecution.findAll({ where: { area_id: areaId } });
        if (!areaExecution) {
            return res.status(404).json({ success: false, error: 'Area Execution not found' });
        }
        res.status(200).json({ success: true, data: areaExecution });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Exported controllers */
export default { getAllCurrentUser, getById };
