import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Like extends Model {
  declare id: number;
  declare userId: number;
  declare contentId: number;
  declare type: 'video' | 'image' | 'audio';
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Like.init(
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
    type: {
      type: DataTypes.ENUM('video', 'image', 'audio'),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Like', tableName: 'likes', timestamps: true }
);
