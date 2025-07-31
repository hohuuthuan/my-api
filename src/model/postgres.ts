import Sequelize from 'sequelize';
import User from './user';
import Admin from './admin';

export default (sequelize: Sequelize.Sequelize): void => {
  User(sequelize);
  Admin(sequelize);
};
