import { Router } from "express";
import {
  createGame,
  getGames,
  getGame,
} from "../controllers/GameController.js";

const gameRouter = Router();

gameRouter.get("/game", getGames);
gameRouter.get("/game/:id", getGame);
gameRouter.post("/game", createGame);

export default gameRouter;
