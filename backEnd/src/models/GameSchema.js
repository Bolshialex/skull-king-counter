import sequelize from "../db/connection.js";
import { DataTypes } from "sequelize";

const Game = sequelize.define("game", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  date_played: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  finished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rounds_needed: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
  players: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default Game;
