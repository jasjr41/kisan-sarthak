const mongoose = require("mongoose");

const fertilizerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        nutrient: {
            type: String,
            required: true,
            trim: true
        },

        composition: {
            type: String,
            required: true,
            trim: true
        },

        suitableCrops: {
            type: [String],
            required: true
        },

        suitableStages: {
            type: [String],
            required: true
        },

        suitableSoils: {
            type: [String],
            required: true
        },

        purpose: {
            type: String,
            required: true
        },

        guidance: {
            type: String,
            required: true
        },

        deficiencySymptoms: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Fertilizer", fertilizerSchema);