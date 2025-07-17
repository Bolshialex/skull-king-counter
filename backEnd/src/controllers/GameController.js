import db from "../models/index.js";

const Game = db.Game;
const Player = db.Player;
const Round = db.Round;
const PlayerGame = db.PlayerGame;

export const createGame = async (req, res) => {
  try {
    const { players, roundNeeded, round_number } = req.body;
    //change to round_needed
    const game = await Game.create({ roundNeeded });

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
    const { game_id } = req.params;
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
