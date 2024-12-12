import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Badge extends Model {
  declare id: number;
  declare userId: number;
  declare badgeType: 'contentCreator' | 'superstar' | 'trendsetter';
  declare earnedAt?: Date;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Badge.init(
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
    badgeType: {
      type: DataTypes.ENUM('contentCreator', 'superstar', 'trendsetter'),
      allowNull: false,
    },
    earnedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Badge', tableName: 'badges', timestamps: true }
);
