import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const Round = sequelize.define("round", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  round_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Round;
