const express = require("express");

const {
    getDeficiencies
} = require("../controllers/deficiencyController.js");

const router = express.Router();

router.get("/", getDeficiencies);

module.exports = router;