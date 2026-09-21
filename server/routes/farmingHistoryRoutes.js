const express = require("express");

const {
    createHistory,
    getHistory,
    getHistoryById,
    deleteHistory
} = require("../controllers/farmingHistoryController.js");

const protect = require("../middleware/authMiddleware.js");

const router = express.Router();


// Create history
router.post("/", protect, createHistory);


// Get user's complete history
router.get("/", protect, getHistory);


// Get one history record
router.get("/:id", protect, getHistoryById);


// Delete history
router.delete("/:id", protect, deleteHistory);


module.exports = router;