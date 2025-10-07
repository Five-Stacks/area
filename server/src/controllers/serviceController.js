/* Import modules */
import { Service } from '../models/serviceModel.js';

/* Controller to get all services */
const getAll = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

/* Controller to get service by ID */
const getById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
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
