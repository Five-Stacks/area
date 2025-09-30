/* Import modules */
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/* Define Action model */
const Action = sequelize.define('Action', {
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
    }
}, {
    tableName: 'actions',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['service_id', 'name'] }
    ]
});

/* Export Action model */
export { Action };
