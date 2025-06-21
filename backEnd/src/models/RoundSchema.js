import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const Round = sequelize.define("round", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  round_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

await Round.schema({});
export default Round;
