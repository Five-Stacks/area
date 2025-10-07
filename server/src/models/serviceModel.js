/* Import modules */
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/* Define Service model */
const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'services',
    timestamps: false
});

/* Export Service model */
export { Service };
