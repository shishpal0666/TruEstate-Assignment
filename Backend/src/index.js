const express = require("express");
const { connectDB } = require("./utils/connectDB");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const errorMiddleware = require("./utils/errorMiddleware");


const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);


const transactionRoutes = require('./routes/transactionRoute');
const authRoutes = require("./routes/authRoute");

app.use("/api/auth", authRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(errorMiddleware);

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
