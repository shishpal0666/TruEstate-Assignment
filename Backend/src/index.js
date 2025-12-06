const express = require("express");
const { connectDB } = require("./utils/connectDB");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.get("/", async (req, res) => {
  res.json({
    messege: "hello",
  });
});

connectDB().then(() => {
  console.log(`MongoDB connected.`);
  app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
});
