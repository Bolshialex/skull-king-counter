import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const PlayerGame = sequelize.define("player_game", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
});
