/* Import modules */
import { User } from './userModel.js';
import { OAuthAccount } from './oauthAccountsModel.js';
import { Service } from './serviceModel.js';
import { Action } from './actionModel.js';
import { Reaction } from './reactionModel.js';
import { Area } from './areaModel.js';
import { AreaExecution } from './areaExecutionModel.js';
import { UserService } from './userServiceModel.js';

/* OAuthAccount <-> User */
OAuthAccount.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
User.hasMany(OAuthAccount, { foreignKey: 'user_id', as: 'oauthAccounts' });

/* User <-> Area */
User.hasMany(Area, { foreignKey: 'user_id', as: 'areas', onDelete: 'CASCADE' });
Area.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

/* Service <-> Action */
Service.hasMany(Action, { foreignKey: 'service_id', as: 'actions', onDelete: 'CASCADE' });
Action.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

/* Service <-> Reaction */
Service.hasMany(Reaction, { foreignKey: 'service_id', as: 'reactions', onDelete: 'CASCADE' });
Reaction.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

/* Action <-> Area */
Action.hasMany(Area, { foreignKey: 'action_id', as: 'areas', onDelete: 'CASCADE' });
Area.belongsTo(Action, { foreignKey: 'action_id', as: 'action' });

/* Reaction <-> Area */
Reaction.hasMany(Area, { foreignKey: 'reaction_id', as: 'areas', onDelete: 'CASCADE' });
Area.belongsTo(Reaction, { foreignKey: 'reaction_id', as: 'reaction' });

/* Area <-> AreaExecution */
Area.hasMany(AreaExecution, { foreignKey: 'area_id', as: 'executions', onDelete: 'CASCADE' });
AreaExecution.belongsTo(Area, { foreignKey: 'area_id', as: 'area' });

/* User <-> Service via UserService */
User.belongsToMany(Service, {
  through: UserService,
  foreignKey: 'user_id',
  otherKey: 'service_id',
  as: 'services'
});
Service.belongsToMany(User, {
  through: UserService,
  foreignKey: 'service_id',
  otherKey: 'user_id',
  as: 'users'
});

UserService.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
UserService.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });
User.hasMany(UserService, { foreignKey: 'user_id', as: 'userServices' });
Service.hasMany(UserService, { foreignKey: 'service_id', as: 'userServices' });

/* Export models */
export {
    User,
    OAuthAccount,
    Service,
    Action,
    Reaction,
    Area,
    AreaExecution,
    UserService
};
