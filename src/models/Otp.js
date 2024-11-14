import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const OTP = sequelize.define('OTP', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default OTP;

