import { Router } from "express";
import { createGame, getGames } from "../controllers/GameController.js";

const gameRouter = Router();

gameRouter.get("/game", getGames);
gameRouter.post("/game", createGame);

export default gameRouter;
