import db from "../models/index.js";

const Game = db.Game;
const Player = db.Player;
const Round = db.Round;
const PlayerGame = db.PlayerGame;

export const createGame = async (req, res) => {
  try {
    const { players, rounds_needed, round_number } = req.body;

    const game = await Game.create({ rounds_needed, players });

    for (const player of players)
      await PlayerGame.create({ game_id: game.id, player_id: player });

    await Round.create({ game_id: game.id, round_number });

    return res.status(201).json({ message: "Game Created" });
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

    for (let player of players) {
      console.log(req.body[player]);
    }

    res.send(game);
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
    console.error("Error getting games:", error);
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
