/* Import modules */
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/* Define Reaction model */
const Reaction = sequelize.define('Reaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'services', key: 'id' }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    config: {
        type: DataTypes.JSONB
    }
}, {
    tableName: 'reactions',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['service_id', 'name'] }
    ]
});

/* Export Reaction model */
export { Reaction };
