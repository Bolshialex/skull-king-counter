import { where } from "sequelize";
import db from "../models/index.js";

const Game = db.Game;
const Player = db.Player;
const Round = db.Round;
const PlayerGame = db.PlayerGame;
const PlayerRound = db.PlayerRound;

export const createGame = async (req, res) => {
  try {
    const { players, rounds_needed, round_number } = req.body;

    const game = await Game.create({ rounds_needed, players });

    for (const player of players)
      await PlayerGame.create({ game_id: game.id, player_id: player });

    const round = await Round.create({ game_id: game.id, round_number });

    return res
      .status(201)
      .json({ message: "Game Created", round_info: round, game_info: game });
  } catch (error) {
    console.error("Error creating game:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addRound = async (req, res) => {
  try {
    const { round_id } = req.body;
    const round = await Round.findOne({ where: { id: round_id } });
    const game = await Game.findOne({ where: { id: round.game_id } });
    const players = game.players;
    const newPlayerRoundInfo = {};

    for (let player of players) {
      const { bid, tricks_won, score, bonus_points, round_score } =
        req.body[player];

      if (round.round_number === 1) {
        const newInfo = await PlayerRound.create({
          bid,
          tricks_won,
          score: round_score + bonus_points,
          bonus_points,
          round_score,
          player_id: player,
          round_id,
        });

        newPlayerRoundInfo[player] = newInfo;
      } else {
        const prevRound = await Round.findOne({
          where: {
            game_id: round.game_id,
            round_number: round.round_number - 1,
          },
        });

        const prevPlayerRound = await PlayerRound.findOne({
          where: {
            player_id: player,
            round_id: prevRound.id,
          },
        });

        const newInfo = await PlayerRound.create({
          bid,
          tricks_won,
          score: prevPlayerRound.score + round_score + bonus_points,
          bonus_points,
          round_score,
          player_id: player,
          round_id,
        });

        newPlayerRoundInfo[player] = newInfo;
      }
    }
    const newRound = await Round.create({
      game_id: round.game_id,
      round_number: round.round_number + 1,
    });

    return res.status(201).json({ newRound, newPlayerRoundInfo });
  } catch (error) {
    console.error("Error creating round info:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGames = async (req, res) => {
  try {
    const allGames = await Game.findAll();

    return res.status(200).json(allGames);
  } catch (error) {
    console.error("Error finding games:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ where: { id } });

    return res.status(200).json(game);
  } catch (error) {
    console.error("Error finding game:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPlayerRound = async (req, res) => {
  try {
    const { player_id, round_id } = req.params;
    console.log(player_id);
    console.log(round_id);
    const playerRoundInfo = await PlayerRound.findAll({
      where: { player_id, round_id },
    });

    return res.status(200).json(playerRoundInfo);
  } catch (error) {
    console.error("Error finding round information");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
