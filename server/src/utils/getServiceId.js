/* Import modules */
import { Service } from "../models/indexModel.js";

/* Function to get service ID by name */
async function getServiceId(serviceName) {
    if (!serviceName) return null;
    const normalizedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1).toLowerCase();
    const service = await Service.findOne({
        where: {
            name: normalizedName
        }
    });
    return service ? service.id : null;
}

/* Export function */
export default getServiceId;
