import { DataTypes, Model, Optional, Association } from 'sequelize';
import sequelize from '../config/database';
import { Upload } from './uploadModel';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  // Declare the 'uploads' association here to avoid the TypeScript error
  declare uploads?: Upload[];  // This tells TypeScript that User can have many uploads
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

// Define the association between User and Upload
User.hasMany(Upload, {
  foreignKey: 'userId',
  as: 'uploads',  // Alias to access uploads property
});

export default User;
