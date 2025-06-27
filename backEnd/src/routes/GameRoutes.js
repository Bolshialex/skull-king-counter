import { Router } from "express";
import { createGame } from "../controllers/GameController.js";

const gameRouter = Router();

gameRouter.post("/game", createGame);

export default gameRouter;
