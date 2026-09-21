const Farm = require("../models/Farm");


// ==========================================
// SAVE FARM PREFERENCES
// ==========================================

const createFarm = async (req, res) => {
    try {

        const {
            farmerName,
            location,
            crop,
            soilType,
            farmSize,
            growthStage,
            farmingActivity
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !farmerName ||
            !location ||
            !crop ||
            !soilType ||
            farmSize === undefined ||
            !growthStage
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required farm details"
            });
        }


        // ==========================================
        // GET LOGGED-IN USER
        // ==========================================

        const userId = req.user.userId;


        // ==========================================
        // CREATE FARM
        // ==========================================

        const farm = await Farm.create({

            user: userId,

            farmerName,
            location,
            crop,
            soilType,
            farmSize,
            growthStage,
            farmingActivity:
                farmingActivity || "general"

        });


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(201).json({

            success: true,

            message:
                "Farm preferences saved successfully",

            data: farm

        });

    } catch (error) {

        console.error(
            "Error saving farm preferences:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to save farm preferences"

        });

    }
};


// ==========================================
// GET USER'S FARMS
// ==========================================

const getFarms = async (req, res) => {

    try {

        const userId = req.user.userId;


        const farms = await Farm.find({
            user: userId
        }).sort({
            createdAt: -1
        });


        res.status(200).json({

            success: true,

            count: farms.length,

            data: farms

        });

    } catch (error) {

        console.error(
            "Error fetching farms:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch farm preferences"

        });

    }
};


// ==========================================
// GET SINGLE FARM
// ==========================================

const getFarmById = async (req, res) => {

    try {

        const userId = req.user.userId;


        const farm = await Farm.findOne({

            _id: req.params.id,

            user: userId

        });


        if (!farm) {

            return res.status(404).json({

                success: false,

                message: "Farm not found"

            });

        }


        res.status(200).json({

            success: true,

            data: farm

        });

    } catch (error) {

        console.error(
            "Error fetching farm:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: "Failed to fetch farm"

        });

    }
};


// ==========================================
// UPDATE FARM
// ==========================================

const updateFarm = async (req, res) => {

    try {

        const {
            farmerName,
            location,
            crop,
            soilType,
            farmSize,
            growthStage,
            farmingActivity
        } = req.body;


        const userId = req.user.userId;


        const farm = await Farm.findOneAndUpdate(

            {
                _id: req.params.id,

                user: userId
            },

            {
                farmerName,
                location,
                crop,
                soilType,
                farmSize,
                growthStage,
                farmingActivity
            },

            {
                new: true,

                runValidators: true
            }

        );


        if (!farm) {

            return res.status(404).json({

                success: false,

                message:
                    "Farm not found or you do not have permission to update it"

            });

        }


        res.status(200).json({

            success: true,

            message:
                "Farm preferences updated successfully",

            data: farm

        });

    } catch (error) {

        console.error(
            "Error updating farm:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to update farm preferences"

        });

    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    createFarm,

    getFarms,

    getFarmById,

    updateFarm

};