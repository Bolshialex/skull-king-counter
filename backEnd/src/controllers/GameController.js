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
      const { bid, tricks_won, score, bonus_points, round_score } =
        req.body[player];
      //if round.round_number is 1 just make a new player_round
      //else find round where round.game_id == and where round.round_number - 1
      //take this scores and add it to the info given and create a new player_round
      if (round.round_number === 1) {
        console.log("create new round");
        await PlayerRound.create({
          bid,
          tricks_won,
          score: score + round_score + bonus_points,
          bonus_points,
          round_score,
          player_id: player,
          round_id,
        });
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

        await PlayerRound.create({
          bid,
          tricks_won,
          score: prevPlayerRound.score + round_score + bonus_points,
          bonus_points,
          round_score,
          player_id: player,
          round_id,
        });
      }
      req.body[player];
    }
    await Round.create({
      game_id: round.game_id,
      round_number: round.round_number + 1,
    });

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
