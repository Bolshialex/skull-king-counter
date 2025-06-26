import Game from "./gameSchema.js";
import PlayerGame from "./PlayerGameSchema.js";
import PlayerRound from "./PlayerRoundSchema.js";
import Round from "./roundSchema.js";
import Stats from "./statsSchema.js";
import Player from "./PlayerSchema.js";
import sequelize from "../db/connection.js";

// Player - Stats one-to-one
Player.hasOne(Stats, {
  foreignKey: "player_id",
});
Stats.belongsTo(Player, { foreignKey: "player_id" });

// Player < PlayerGame one-to-many
Player.hasMany(PlayerGame, {
  foreignKey: "player_id",
});
PlayerGame.belongsTo(Player, {
  foreignKey: "player_id",
});

// Player > PlayerRound one-to-many
Player.hasMany(PlayerRound, {
  foreignKey: "player_id",
});
PlayerRound.belongsTo(Player, {
  foreignKey: "player_id",
});

// Game < PlayerGame one-to-many
Game.hasMany(PlayerGame, {
  foreignKey: "game_id",
});
PlayerGame.belongsTo(Game, {
  foreignKey: "game_id",
});

// Game < Round one-to-many
Game.hasMany(Round, {
  foreignKey: "game_id",
});
Round.belongsTo(Game, {
  foreignKey: "game_id",
});

// Round < PlayerRound one-to-many
Round.hasMany(PlayerRound, {
  foreignKey: "round_id",
});
PlayerRound.belongsTo(Round, {
  foreignKey: "round_id",
});

const db = {
  sequelize,
  Game,
  Player,
  Stats,
  Round,
  PlayerGame,
  PlayerRound,
};

export default db;
