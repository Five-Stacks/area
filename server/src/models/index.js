import { User } from './userModel.js';
import { OAuthAccount } from './oauthAccountsModel.js';

// Define associations
OAuthAccount.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
User.hasMany(OAuthAccount, { foreignKey: 'user_id', as: 'oauthAccounts' });

export {
    User,
    OAuthAccount
};
