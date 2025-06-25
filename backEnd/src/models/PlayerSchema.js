import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const Player = sequelize.define("player", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Player;
