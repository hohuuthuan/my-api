import { Model, DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export class MAdmin extends Model {
  declare id?: string;
  declare username: string;
  declare password: string;
  declare fullname: string;
  declare lock?: {
    status: boolean;
    at: Date;
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize): typeof MAdmin => {
  MAdmin.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lock: {
      type: DataTypes.JSON,
      allowNull: true
    },
  }, {
    tableName: 'admin',
    timestamps: true,
    sequelize
  });

  return MAdmin;
}