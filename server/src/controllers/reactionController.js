/* Import modules */
import { Reaction } from '../models/reactionModel.js';

/* Controller to get all reactions */
const getAll = async (req, res) => {
    try {
        const reactions = await Reaction.findAll();
        res.status(200).json({ success: true, data: reactions });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' + error.message });
    }
};

/* Controller to get reaction by ID */
const getById = async (req, res) => {
    try {
        const reaction = await Reaction.findByPk(req.params.id);
        if (!reaction) {
            return res.status(404).json({ success: false, error: 'Reaction not found' });
        }
        res.status(200).json({ success: true, data: reaction });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Exported controllers */
export default { getAll, getById };
