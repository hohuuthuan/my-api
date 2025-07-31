import Sequelize from 'sequelize';
import User from './user';

export default (sequelize: Sequelize.Sequelize): void => {
  User(sequelize);
};
