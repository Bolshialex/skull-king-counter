import db from "../models/index.js";

const Game = db.Game;
const Player = db.Player;
const Round = db.Round;
const PlayerGame = db.PlayerGame;

export const createGame = async (req, res) => {
  try {
    const { players } = req.body;
    const game = await Game.create();

    for (const player of players)
      await PlayerGame.create({ game_id: game.id, player_id: player });

    await res.status(201).json({ message: "Game Created" });
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
