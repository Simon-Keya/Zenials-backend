import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Monetization extends Model {
  declare id: number;
  declare userId: number;
  declare contentId: number;
  declare price: number;
  declare earned: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Monetization.init(
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
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    earned: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  { sequelize, modelName: 'Monetization', tableName: 'monetizations', timestamps: true }
);
