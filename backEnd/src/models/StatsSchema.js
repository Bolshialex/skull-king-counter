import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

//don't forget to define the relationship
const Stats = sequelize.define("stats", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  games_played: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  win_percentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  wins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  loses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

await Stats.schema({});
export default Stats;
