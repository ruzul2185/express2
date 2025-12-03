import express from "express";
import { config } from "dotenv";
config();

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import DatabaseConn from "./utils/database.js";
import authentication from "./utils/authentication.js";

const app = express();
DatabaseConn();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.get("/test", authentication);

app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
