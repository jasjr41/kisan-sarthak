const express = require("express");

const {
    getFertilizers
} = require("../controllers/fertilizerController.js");

const router = express.Router();

router.get("/", getFertilizers);

module.exports = router;