/* Import modules */
import { UserService } from '../models/userServiceModel.js';

/* Controller to get all user services */
const getAll = async (req, res) => {
    try {
        const services = await UserService.findAll();
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Controller to get user service by ID */
const getById = async (req, res) => {
    try {
        const service = await UserService.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, error: 'Service not found' });
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Exported controllers */
export default { getAll, getById };