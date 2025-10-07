/* Import modules */
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/* Define Area model */
const Area = sequelize.define('Area', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    action_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'actions', key: 'id' }
    },
    reaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'reactions', key: 'id' }
    },
    config: {
        type: DataTypes.JSONB
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'areas',
    timestamps: false
});

/* Export Area model */
export { Area };
