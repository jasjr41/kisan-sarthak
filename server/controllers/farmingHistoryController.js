const FarmingHistory = require("../models/FarmingHistory");

// ==========================================
// CREATE FARMING HISTORY
// ==========================================

const createHistory = async (req, res) => {
    try {
        const {
            farm,
            date,
            crop,
            activity,
            growthStage,
            location,
            notes
        } = req.body;

        if (!crop || !activity || !growthStage) {
            return res.status(400).json({
                success: false,
                message:
                    "Crop, activity and growth stage are required"
            });
        }

        const history = await FarmingHistory.create({
            user: req.user.userId,
            farm: farm || null,
            date: date || Date.now(),
            crop,
            activity,
            growthStage,
            location: location || "",
            notes: notes || ""
        });

        res.status(201).json({
            success: true,
            message: "Farming activity recorded successfully",
            data: history
        });
    } catch (error) {
        console.error(
            "Error creating farming history:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to record farming activity"
        });
    }
};


// ==========================================
// GET USER'S FARMING HISTORY
// ==========================================

const getHistory = async (req, res) => {
    try {
        const history = await FarmingHistory.find({
            user: req.user.userId
        })
            .populate("farm", "farmerName location crop")
            .sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });
    } catch (error) {
        console.error(
            "Error fetching farming history:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch farming history"
        });
    }
};


// ==========================================
// GET SINGLE HISTORY RECORD
// ==========================================

const getHistoryById = async (req, res) => {
    try {
        const history = await FarmingHistory.findOne({
            _id: req.params.id,
            user: req.user.userId
        }).populate(
            "farm",
            "farmerName location crop"
        );

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "Farming history record not found"
            });
        }

        res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        console.error(
            "Error fetching history record:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch history record"
        });
    }
};


// ==========================================
// DELETE HISTORY RECORD
// ==========================================

const deleteHistory = async (req, res) => {
    try {
        const history = await FarmingHistory.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!history) {
            return res.status(404).json({
                success: false,
                message:
                    "History record not found or you do not have permission to delete it"
            });
        }

        res.status(200).json({
            success: true,
            message: "Farming history record deleted successfully"
        });
    } catch (error) {
        console.error(
            "Error deleting history:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete history record"
        });
    }
};


module.exports = {
    createHistory,
    getHistory,
    getHistoryById,
    deleteHistory
};