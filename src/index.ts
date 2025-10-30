import { config } from "dotenv";
config();

import express from "express";

import type { Request, Response } from "express";

const app = express();
app.use(express.json());

app.use("/:something", (req: Request, res: Response) => {
  const { something } = req.params;
  return res.status(200).json({ message: "Successful Response!" + something });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is running of port " + PORT);
});
