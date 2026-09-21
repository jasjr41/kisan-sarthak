const mongoose = require("mongoose");

const nutrientDeficiencySchema = new mongoose.Schema(
    {
        nutrient: {
            type: String,
            required: true,
            trim: true
        },

        crops: {
            type: [String],
            required: true
        },

        symptoms: {
            type: [String],
            required: true
        },

        fertilizerOptions: {
            type: [String],
            required: true
        },

        explanation: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "NutrientDeficiency",
    nutrientDeficiencySchema
);