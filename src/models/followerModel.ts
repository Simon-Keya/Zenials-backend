import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Follower extends Model {
  declare id: number;
  declare userId: number;
  declare followerId: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Follower', tableName: 'followers', timestamps: true }
);
