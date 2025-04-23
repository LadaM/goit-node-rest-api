import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscription: {
    type: DataTypes.ENUM('starter', 'pro', 'business'),
    defaultValue: 'starter',
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

export default User;
