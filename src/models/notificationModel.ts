import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Notification extends Model {
  declare id: number;
  declare userId: number;
  declare message: string;
  declare read: boolean;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Notification.init(
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'Notification', tableName: 'notifications', timestamps: true }
);
