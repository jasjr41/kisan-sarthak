const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    if (
        cachedConnection &&
        mongoose.connection.readyState === 1
    ) {
        console.log("Using existing MongoDB connection");
        return cachedConnection;
    }

    console.log("Attempting MongoDB connection...");

    try {
        cachedConnection = await mongoose.connect(
            process.env.MONGO_URI,
            {
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000
            }
        );

        console.log(
            "MongoDB connected successfully:",
            mongoose.connection.host
        );

        return cachedConnection;

    } catch (error) {
        cachedConnection = null;

        console.error(
            "MongoDB connection failed:",
            error.name,
            error.message
        );

        throw error;
    }
};

module.exports = connectDB;