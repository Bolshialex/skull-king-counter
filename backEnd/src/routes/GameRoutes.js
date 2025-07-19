import { Router } from "express";
import {
  createGame,
  getGames,
  getGame,
  addRound,
} from "../controllers/GameController.js";

const gameRouter = Router();

gameRouter.get("/game", getGames);
gameRouter.get("/game/:id", getGame);
gameRouter.post("/game", createGame);
gameRouter.post("/round", addRound);

export default gameRouter;
