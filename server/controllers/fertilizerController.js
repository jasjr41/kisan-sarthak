const Fertilizer = require("../models/Fertilizer");

// Get all fertilizers
const getFertilizers = async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find();

        res.status(200).json({
            success: true,
            count: fertilizers.length,
            data: fertilizers
        });

    } catch (error) {
        console.error("Error fetching fertilizers:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch fertilizer data"
        });
    }
};

module.exports = {
    getFertilizers
};