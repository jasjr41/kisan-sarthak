const mongoose = require("mongoose");
const NutrientDeficiency = require("../models/NutrientDeficiency");
require("dotenv").config();

const cropDeficiencyData = [

    // =====================================================
    // WHEAT
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Wheat"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Slow or stunted plant growth"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency in wheat may appear as yellowing of older leaves and reduced vegetative growth."
    },

    {
        nutrient: "Phosphorus",
        crops: ["Wheat"],
        symptoms: [
            "Dark green leaves",
            "Purplish coloration on leaves",
            "Poor root development"
        ],
        fertilizerOptions: [
            "DAP",
            "Single Super Phosphate (SSP)"
        ],
        explanation:
            "Possible phosphorus deficiency can cause slow development, dark green foliage and purplish coloration."
    },

    {
        nutrient: "Potassium",
        crops: ["Wheat"],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Possible potassium deficiency may produce yellowing and scorching along leaf margins."
    },

    {
        nutrient: "Zinc",
        crops: ["Wheat"],
        symptoms: [
            "Yellowing between leaf veins",
            "White or pale bands on leaves",
            "Stunted growth"
        ],
        fertilizerOptions: [
            "Zinc Sulphate 21%",
            "Zinc Sulphate 33%"
        ],
        explanation:
            "Possible zinc deficiency may affect leaf development and cause interveinal yellowing."
    },


    // =====================================================
    // RICE
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Rice"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Overall pale green appearance"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency in rice can result in pale green foliage and reduced plant growth."
    },

    {
        nutrient: "Zinc",
        crops: ["Rice"],
        symptoms: [
            "Yellowing between leaf veins",
            "Small leaves",
            "Stunted growth"
        ],
        fertilizerOptions: [
            "Zinc Sulphate 21%",
            "Zinc Sulphate 33%"
        ],
        explanation:
            "Possible zinc deficiency in rice may cause yellowing, poor leaf development and stunted growth."
    },

    {
        nutrient: "Phosphorus",
        crops: ["Rice"],
        symptoms: [
            "Dark green leaves",
            "Purplish coloration on leaves",
            "Slow early growth"
        ],
        fertilizerOptions: [
            "DAP",
            "Single Super Phosphate (SSP)"
        ],
        explanation:
            "Possible phosphorus deficiency may result in slow early development and dark or purplish foliage."
    },


    // =====================================================
    // MAIZE
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Maize"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Premature yellowing of lower leaves"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency in maize commonly results in yellowing of older leaves and reduced growth."
    },

    {
        nutrient: "Phosphorus",
        crops: ["Maize"],
        symptoms: [
            "Purplish coloration on leaves",
            "Slow early growth",
            "Poor root development"
        ],
        fertilizerOptions: [
            "DAP",
            "Single Super Phosphate (SSP)"
        ],
        explanation:
            "Possible phosphorus deficiency can cause purplish foliage and slow early plant development."
    },

    {
        nutrient: "Potassium",
        crops: ["Maize"],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges",
            "Weak stems"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Possible potassium deficiency can cause marginal leaf scorching and weak plant structure."
    },

    {
        nutrient: "Zinc",
        crops: ["Maize"],
        symptoms: [
            "White or pale bands on leaves",
            "Shortened internodes",
            "Stunted growth"
        ],
        fertilizerOptions: [
            "Zinc Sulphate 21%",
            "Zinc Sulphate 33%"
        ],
        explanation:
            "Possible zinc deficiency can result in pale bands, shortened internodes and reduced growth."
    },


    // =====================================================
    // POTATO
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Potato"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Slow or stunted plant growth"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency may result in pale older foliage and poor vegetative development."
    },

    {
        nutrient: "Potassium",
        crops: ["Potato"],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Possible potassium deficiency may appear as yellowing and scorching of leaf margins."
    },

    {
        nutrient: "Phosphorus",
        crops: ["Potato"],
        symptoms: [
            "Dark green leaves",
            "Slow early growth",
            "Poor root development"
        ],
        fertilizerOptions: [
            "DAP",
            "Single Super Phosphate (SSP)"
        ],
        explanation:
            "Possible phosphorus deficiency can affect early growth and root development."
    },


    // =====================================================
    // TOMATO
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Tomato"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Slow plant growth"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency may cause yellowing of older leaves and reduced vegetative growth."
    },

    {
        nutrient: "Potassium",
        crops: ["Tomato"],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Possible potassium deficiency may result in marginal yellowing and leaf-edge scorching."
    },

    {
        nutrient: "Iron",
        crops: ["Tomato"],
        symptoms: [
            "Young leaves becoming yellow",
            "Yellowing between leaf veins",
            "New growth appears pale"
        ],
        fertilizerOptions: [
            "Ferrous Sulphate"
        ],
        explanation:
            "Possible iron deficiency generally affects newer leaves and can produce interveinal yellowing."
    },

    {
        nutrient: "Phosphorus",
        crops: ["Tomato"],
        symptoms: [
            "Dark green leaves",
            "Purplish coloration on leaves",
            "Slow early growth"
        ],
        fertilizerOptions: [
            "DAP",
            "Single Super Phosphate (SSP)"
        ],
        explanation:
            "Possible phosphorus deficiency may result in dark or purplish foliage and slow growth."
    },


    // =====================================================
    // COTTON
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Cotton"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Slow plant growth"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency can cause yellowing of older foliage and reduced growth."
    },

    {
        nutrient: "Potassium",
        crops: ["Cotton"],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Possible potassium deficiency may cause leaf-edge yellowing and scorching."
    },

    {
        nutrient: "Zinc",
        crops: ["Cotton"],
        symptoms: [
            "Yellowing between leaf veins",
            "Small leaves",
            "Shortened internodes"
        ],
        fertilizerOptions: [
            "Zinc Sulphate 21%",
            "Zinc Sulphate 33%"
        ],
        explanation:
            "Possible zinc deficiency may cause interveinal yellowing and restricted leaf development."
    },


    // =====================================================
    // MUSTARD
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Mustard"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Slow plant growth"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency may cause pale older foliage and reduced plant growth."
    },

    {
        nutrient: "Sulphur",
        crops: ["Mustard"],
        symptoms: [
            "Young leaves becoming pale yellow",
            "Yellowing of newer leaves",
            "Thin and weak stems"
        ],
        fertilizerOptions: [
            "Single Super Phosphate (SSP)",
            "Gypsum"
        ],
        explanation:
            "Possible sulphur deficiency is important to consider in mustard because sulphur is involved in oilseed development."
    },

    {
        nutrient: "Potassium",
        crops: ["Mustard"],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Possible potassium deficiency may result in yellowing and scorching along leaf margins."
    },


    // =====================================================
    // SUGARCANE
    // =====================================================

    {
        nutrient: "Nitrogen",
        crops: ["Sugarcane"],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Slow or stunted plant growth"
        ],
        fertilizerOptions: ["Urea", "DAP"],
        explanation:
            "Possible nitrogen deficiency may cause pale foliage and reduced vegetative growth."
    },

    {
        nutrient: "Potassium",
        crops: ["Sugarcane"],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges",
            "Weak stems"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Possible potassium deficiency can affect leaf margins and plant strength."
    },

    {
        nutrient: "Sulphur",
        crops: ["Sugarcane"],
        symptoms: [
            "Young leaves becoming pale yellow",
            "Yellowing of newer leaves",
            "Slow plant development"
        ],
        fertilizerOptions: [
            "Single Super Phosphate (SSP)",
            "Gypsum"
        ],
        explanation:
            "Possible sulphur deficiency may result in pale younger leaves and reduced plant development."
    }

];


const seedCropDeficiencies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await NutrientDeficiency.deleteMany({});

        await NutrientDeficiency.insertMany(
            cropDeficiencyData
        );

        console.log(
            `${cropDeficiencyData.length} crop-specific deficiency records inserted successfully`
        );

        await mongoose.disconnect();

        console.log("MongoDB disconnected");
    } catch (error) {
        console.error(
            "Error seeding crop deficiencies:",
            error.message
        );

        process.exit(1);
    }
};

seedCropDeficiencies();