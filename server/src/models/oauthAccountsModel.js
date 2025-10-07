import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/* Define OAuthAccounts model */

const OAuthAccount = sequelize.define('OAuthAccount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    provider_user_id: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    access_token: {
        type: DataTypes.TEXT
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    expires_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'oauth_accounts',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['provider', 'provider_user_id']
        }
    ]
});

/* Export OAuthAccount model */
export { OAuthAccount };
