const express = require("express");
const { connectDB } = require("./utils/connectDB");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");


const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


const helloRoute = require("./routes/helloRoute");

app.use("/api", helloRoute);


connectDB()
  .then(() => {
    console.log("MongoDB connected.");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
