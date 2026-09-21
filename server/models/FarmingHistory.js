const mongoose = require("mongoose");

const farmingHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        farm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farm",
            default: null
        },

        date: {
            type: Date,
            default: Date.now,
            required: true
        },

        crop: {
            type: String,
            required: true,
            trim: true
        },

        activity: {
            type: String,
            required: true,
            trim: true
        },

        growthStage: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            trim: true,
            default: ""
        },

        notes: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "FarmingHistory",
    farmingHistorySchema
);