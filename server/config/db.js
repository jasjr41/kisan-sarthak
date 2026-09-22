const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        cachedConnection = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        return cachedConnection;
    } catch (error) {
        cachedConnection = null;

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        throw error;
    }
};

module.exports = connectDB;