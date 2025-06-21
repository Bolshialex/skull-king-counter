import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const PlayerRound = sequelize.define("player_round", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  bid: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tricks_won: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

await PlayerRound.schema({});
export default PlayerRound;
