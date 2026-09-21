const PestDisease = require("../models/PestDisease");

const getPestDiseases = async (req, res) => {
    try {
        const { crop, type } = req.query;

        const filter = {};

        // Filter by crop
        if (crop) {
            filter.crops = {
                $regex: new RegExp(`^${crop}$`, "i")
            };
        }

        // Filter by Pest / Disease
        if (type) {
            filter.type = {
                $regex: new RegExp(`^${type}$`, "i")
            };
        }

        const pestDiseases = await PestDisease.find(filter);

        res.status(200).json({
            success: true,
            count: pestDiseases.length,
            data: pestDiseases
        });

    } catch (error) {
        console.error(
            "Error fetching pest and disease data:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch pest and disease data"
        });
    }
};

module.exports = {
    getPestDiseases
};