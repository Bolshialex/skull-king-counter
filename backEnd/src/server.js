import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js";

dotenv.config();
const { FE_PORT } = process.env;
const PORT = FE_PORT;
const app = express();

app.use(express());
app.use(express.json());

await db.sequelize.sync({ alter: true });

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
