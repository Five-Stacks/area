/* Import modules */
import { Action } from '../models/actionModel.js';

/* Controller to get all actions */
const getAll = async (req, res) => {
    try {
        const actions = await Action.findAll();
        res.status(200).json({ success: true, data: actions });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Controller to get action by ID */
const getById = async (req, res) => {
    try {
        const action = await Action.findByPk(req.params.id);
        if (!action) {
            return res.status(404).json({ success: false, error: 'Action not found' });
        }
        res.status(200).json({ success: true, data: action });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Exported controllers */
export default { getAll, getById };
