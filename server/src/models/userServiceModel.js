/* Import modules */
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/* Define UserService model */
const UserService = sequelize.define('UserService', {
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
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'services', key: 'id' }
    },
    oauth_account_id: {
        type: DataTypes.INTEGER,
        references: { model: 'oauth_accounts', key: 'id' }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'user_services',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['user_id', 'service_id'] }
    ]
});

/* Export UserService model */
export { UserService };
