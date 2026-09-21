const express = require("express");

const {
    createFarm,
    getFarms,
    getFarmById,
    updateFarm
} = require("../controllers/farmController.js");

const protect = require("../middleware/authMiddleware.js");

const router = express.Router();


// ==========================================
// PROTECTED FARM ROUTES
// ==========================================

// Create farm
router.post("/", protect, createFarm);

// Get logged-in user's farms
router.get("/", protect, getFarms);

// Get one farm
router.get("/:id", protect, getFarmById);

// Update farm
router.put("/:id", protect, updateFarm);


module.exports = router;