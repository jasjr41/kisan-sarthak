const express = require("express");

const {
    getPestDiseases
} = require("../controllers/pestDiseaseController.js");

const router = express.Router();

router.get("/", getPestDiseases);

module.exports = router;