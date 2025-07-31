import { Model, DataTypes, Sequelize } from 'sequelize';

export class MUser extends Model {
  declare id?: string;
  declare email: string;
  declare password: string;
  declare name: string;
}

export default (sequelize: Sequelize): typeof MUser => {
  MUser.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'MUser',
    timestamps: true
  });

  return MUser;
};
