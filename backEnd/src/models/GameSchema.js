import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const Game = sequelize.define("game", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  date_played: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
});

await Game.schema({});
export default Game;
