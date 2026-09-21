const Crop = require("../models/crop");

const getCrops = async (req, res) => {
    try {
        const crops = await Crop.find().sort({ name: 1 });

        res.json({
            success: true,
            count: crops.length,
            data: crops
        });

    } catch (error) {
        console.error("Error fetching crops:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch crop data"
        });
    }
};

const getCropByName = async (req, res) => {
    try {
        const crop = await Crop.findOne({
            name: {
                $regex: `^${req.params.name}$`,
                $options: "i"
            }
        });

        if (!crop) {
            return res.status(404).json({
                success: false,
                message: "Crop not found"
            });
        }

        res.json({
            success: true,
            data: crop
        });

    } catch (error) {
        console.error("Error fetching crop:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch crop data"
        });
    }
};

module.exports = {
    getCrops,
    getCropByName
};