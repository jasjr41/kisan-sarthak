const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        farmerName: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        crop: {
            type: String,
            required: true,
            trim: true
        },

        soilType: {
            type: String,
            required: true,
            trim: true
        },

        farmSize: {
            type: Number,
            required: true,
            min: 0
        },

        growthStage: {
            type: String,
            required: true,
            trim: true
        },

        farmingActivity: {
            type: String,
            default: "general",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Farm", farmSchema);