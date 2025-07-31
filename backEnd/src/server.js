import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js";
import PlayerRouter from "./routes/PlayerRoutes.js";
import gameRouter from "./routes/GameRoutes.js";
import colors from "colors";
import cors from "cors";

dotenv.config();
const { FE_PORT } = process.env;
const PORT = FE_PORT;
const app = express();
app.use(express());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await db.sequelize.sync();

app.use("/", PlayerRouter);
app.use("/", gameRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`.bgYellow);
});
