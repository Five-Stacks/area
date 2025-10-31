import sequelize from "../config/sequelize.js";

async function getIdOfService(serviceName) {
    if (!serviceName) {
        return null;
    }
    const normalizedName =
        serviceName.charAt(0).toUpperCase() + serviceName.slice(1).toLowerCase();

    const service = await sequelize.models.Service.findOne({
        where: {
            name: normalizedName
        }
    });

    return service ? service.id : null;
}

export default getIdOfService;