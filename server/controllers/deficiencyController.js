const NutrientDeficiency = require("../models/NutrientDeficiency");

// Get all nutrient deficiencies
const getDeficiencies = async (req, res) => {
    try {
        const deficiencies = await NutrientDeficiency.find();

        res.status(200).json({
            success: true,
            count: deficiencies.length,
            data: deficiencies
        });
    } catch (error) {
        console.error(
            "Error fetching deficiency data:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch nutrient deficiency data"
        });
    }
};

module.exports = {
    getDeficiencies
};