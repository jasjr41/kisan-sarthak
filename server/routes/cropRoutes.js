const express = require("express");

const router = express.Router();

const {
    getCrops,
    getCropByName
} = require("../controllers/cropController");

router.get("/", getCrops);

router.get("/:name", getCropByName);

module.exports = router;