import express from "express";
import { config } from "dotenv";
config();

import userRoute from "./routes/userRoute.js";
import DatabaseConn from "./utils/database.js";

const app = express();
DatabaseConn();
app.use(express.json());

app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
