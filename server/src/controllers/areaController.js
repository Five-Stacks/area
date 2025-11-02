/* Import modules */
import { Area } from '../models/areaModel.js';

/* Controller to add a new area */
const add = async (req, res) => {
    try {
        const { action_id, reaction_ids, config, is_active } = req.body;
        if (!action_id || !reaction_ids || !Array.isArray(reaction_ids)) {
            return res.status(400).json({ success: false, error: 'Action ID and Reaction IDs are required' });
        }
        const newArea = await Area.create({ user_id: req.user.userId, action_id, reaction_ids, config, is_active });
        res.status(201).json({ success: true, data: newArea });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error: ' + error });
    }
};

/* Controller to get all areas for the current user */
const getAllCurrentUser = async (req, res) => {
    try {
        const areas = await Area.findAll({ where: { user_id: req.user.userId } });
        res.status(200).json({ success: true, data: areas });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Controller to get an area by ID */
const getById = async (req, res) => {
    try {
        const area = await Area.findOne({ where: { id: req.params.id, user_id: req.user.userId } });
        if (!area) {
            return res.status(404).json({ success: false, error: 'Area not found' });
        }
        res.status(200).json({ success: true, data: area });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Controller to update an area by ID */
const updateById = async (req, res) => {
    try {
        const { action_id, reaction_ids, config, is_active } = req.body;
        const area = await Area.findOne({ where: { id: req.params.id, user_id: req.user.userId } });
        if (!area) {
            return res.status(404).json({ success: false, error: 'Area not found' });
        }
        area.action_id = action_id || area.action_id;
        area.reaction_ids = reaction_ids || area.reaction_ids;
        area.config = config || area.config;
        area.is_active = is_active !== undefined ? is_active : area.is_active;
        await area.save();
        res.status(200).json({ success: true, data: area });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Controller to delete an area by ID */
const deleteById = async (req, res) => {
    try {
        const area = await Area.findOne({ where: { id: req.params.id, user_id: req.user.userId } });
        if (!area) {
            return res.status(404).json({ success: false, error: 'Area not found' });
        }
        await area.destroy();
        res.status(200).json({ success: true, message: 'Area deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Exported controllers */
export default { add, getAllCurrentUser, getById, updateById, deleteById };
