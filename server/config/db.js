const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
    if (
        cachedConnection &&
        mongoose.connection.readyState === 1
    ) {
        return cachedConnection;
    }

    try {
        cachedConnection = await mongoose.connect(
            process.env.MONGO_URI,
            {
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000
            }
        );

        return cachedConnection;
    } catch (error) {
        cachedConnection = null;
        throw error;
    }
};

module.exports = connectDB;