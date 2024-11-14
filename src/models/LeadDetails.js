import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";
import User from "./user.js";
const LeadDetails = sequelize.define("leaddetails", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leadSource: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'email'
    },
    unique: true,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  annualIncome: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  noOfKids: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  partnersIncome: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  carLoan: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  savings: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  creditCardLimit: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  loanAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  propertyValue: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

User.hasMany(LeadDetails, { foreignKey: 'email', sourceKey: 'email' });
LeadDetails.belongsTo(User, { foreignKey: 'email', targetKey: 'email' });

export default LeadDetails;
