/* Import modules */
import { Service, Action, Reaction } from '../models/indexModel.js';

/* Controller to get about info */
const getAboutInfo = async (req, res) => {
    try {
        let clientHost = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
        if (typeof clientHost === 'string' && clientHost.startsWith('::ffff:')) {
            clientHost = clientHost.replace('::ffff:', '');
        }
        const currentTime = Math.floor(Date.now() / 1000);
        const services = await Service.findAll({
            include: [
                {
                    model: Action,
                    as: 'actions',
                    attributes: ['name', 'description']
                },
                {
                    model: Reaction,
                    as: 'reactions',
                    attributes: ['name', 'description']
                }
            ]
        });
        const formattedServices = services.map(service => ({
            name: service.name,
            actions: service.actions.map(action => ({
                name: action.name,
                description: action.description
            })),
            reactions: service.reactions.map(reaction => ({
                name: reaction.name,
                description: reaction.description
            }))
        }));
        const response = {
            client: {
                host: clientHost
            },
            server: {
                current_time: currentTime,
                services: formattedServices
            }
        };
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch about info', details: error.message });
    }
};

/* Exported controllers */
export default { getAboutInfo };
