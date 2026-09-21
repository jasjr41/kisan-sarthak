const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        temperature: {
            min: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            }
        },

        soilTypes: {
            type: [String],
            required: true
        },

        waterRequirement: {
            type: String,
            required: true
        },

        growthStages: {
            type: [String],
            required: true
        },

        irrigationGuidance: {
            type: String,
            required: true
        },

        fertilizerGuidance: {
            type: String,
            required: true
        },

        weatherRisks: {
            type: [String],
            required: true
        },

        cropProtection: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports =
    mongoose.models.Crop ||
    mongoose.model("Crop", cropSchema);