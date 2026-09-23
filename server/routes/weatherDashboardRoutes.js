const express = require("express");

const {
    getWeatherDashboard
} = require("../controllers/weatherDashboardController");

const router = express.Router();

router.get("/", getWeatherDashboard);

module.exports = router;