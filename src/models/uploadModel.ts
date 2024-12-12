import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from './userModel'; // Ensure you import the User model

export class Upload extends Model {
  declare id: number;
  declare userId: number;
  declare filePath: string;
  declare type: 'video' | 'image' | 'audio';
  declare title: string;
  declare description: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

// Initialize the Upload model
Upload.init(
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
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('video', 'image', 'audio'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'Upload', tableName: 'uploads', timestamps: true }
);

// Define associations
Upload.belongsTo(User, { foreignKey: 'userId' }); // Each upload belongs to a user
User.hasMany(Upload, { foreignKey: 'userId' }); // A user can have many uploads
