const mongoose = require("mongoose");

const pestDiseaseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: ["Pest", "Disease"]
        },

        crops: {
            type: [String],
            required: true
        },

        symptoms: {
            type: [String],
            required: true
        },

        favorableConditions: {
            type: [String],
            required: true
        },

        prevention: {
            type: [String],
            required: true
        },

        management: {
            type: [String],
            required: true
        },

        severity: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "PestDisease",
    pestDiseaseSchema
);