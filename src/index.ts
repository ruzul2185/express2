import express from "express";

const app = express();

app.get("/", (_, res) => {
  res
    .status(200)
    .json({ success: true, message: "Server is working properly!" });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
