const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async()=>{
    const mongoString = process.env.MONGODB_STRING;
    if (!mongoString) throw new Error("MONGODB_URI is required");
    await mongoose.connect(
        mongoString
    );
};

module.exports = { connectDB };