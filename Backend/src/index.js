const express = require("express");
const { connectDB } = require("./utils/connectDB");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const errorMiddleware = require("./utils/errorMiddleware");


const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(errorMiddleware);


const transactionRoutes = require('./routes/transactionRoute');

app.use('/api/transactions', transactionRoutes);

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
