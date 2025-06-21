import express from "express";
import dotenv from "dotenv";

dotenv.config();
const { FE_PORT } = process.env;
const PORT = FE_PORT;
const app = express();

app.use(express());

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
