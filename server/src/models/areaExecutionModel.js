/* Import modules */
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/* Define AreaExecution model */
const AreaExecution = sequelize.define('AreaExecution', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'areas', key: 'id' }
    },
    executed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING(50)
    },
    log: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'area_executions',
    timestamps: false
});

/* Export AreaExecution model */
export { AreaExecution };
