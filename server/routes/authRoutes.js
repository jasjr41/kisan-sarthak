const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController.js");

const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// Protected test route
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authentication successful",
        userId: req.user.userId
    });
});

module.exports = router;