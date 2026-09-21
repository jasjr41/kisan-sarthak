const mongoose = require("mongoose");
const NutrientDeficiency = require("../models/NutrientDeficiency");
require("dotenv").config();

const deficiencyData = [
    // =========================
    // NITROGEN
    // =========================
    {
        nutrient: "Nitrogen",
        crops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton",
            "Mustard",
            "Sugarcane"
        ],
        symptoms: [
            "Older leaves turning pale green or yellow",
            "Slow or stunted plant growth",
            "Overall pale green appearance",
            "Premature yellowing of lower leaves"
        ],
        fertilizerOptions: [
            "Urea",
            "DAP"
        ],
        explanation:
            "Nitrogen deficiency commonly affects older leaves first and can result in pale foliage and reduced vegetative growth."
    },

    // =========================
    // PHOSPHORUS
    // =========================
    {
        nutrient: "Phosphorus",
        crops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton",
            "Mustard",
            "Sugarcane"
        ],
        symptoms: [
            "Slow early growth",
            "Stunted plant growth",
            "Dark green leaves",
            "Purplish coloration on leaves",
            "Poor root development"
        ],
        fertilizerOptions: [
            "DAP",
            "Single Super Phosphate (SSP)"
        ],
        explanation:
            "Phosphorus is important for root development and early plant growth. Deficiency can cause slow growth and dark or purplish foliage."
    },

    // =========================
    // POTASSIUM
    // =========================
    {
        nutrient: "Potassium",
        crops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton",
            "Mustard",
            "Sugarcane"
        ],
        symptoms: [
            "Yellowing starts from leaf tips",
            "Brown or scorched leaf edges",
            "Older leaves showing marginal yellowing",
            "Weak stems",
            "Reduced plant strength"
        ],
        fertilizerOptions: [
            "Muriate of Potash (MOP)"
        ],
        explanation:
            "Potassium deficiency can cause yellowing and scorching along leaf margins, particularly on older leaves."
    },

    // =========================
    // ZINC
    // =========================
    {
        nutrient: "Zinc",
        crops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton"
        ],
        symptoms: [
            "Yellowing between leaf veins",
            "Small leaves",
            "Shortened internodes",
            "White or pale bands on leaves",
            "Stunted growth"
        ],
        fertilizerOptions: [
            "Zinc Sulphate 21%",
            "Zinc Sulphate 33%"
        ],
        explanation:
            "Zinc deficiency can affect leaf development and plant growth, often producing interveinal chlorosis and shortened internodes."
    },

    // =========================
    // SULPHUR
    // =========================
    {
        nutrient: "Sulphur",
        crops: [
            "Wheat",
            "Rice",
            "Maize",
            "Mustard",
            "Sugarcane",
            "Cotton"
        ],
        symptoms: [
            "Young leaves becoming pale yellow",
            "Yellowing of newer leaves",
            "Thin and weak stems",
            "Slow plant development"
        ],
        fertilizerOptions: [
            "Single Super Phosphate (SSP)",
            "Gypsum"
        ],
        explanation:
            "Sulphur deficiency often appears first in younger leaves and can result in pale foliage and weak plant development."
    },

    // =========================
    // IRON
    // =========================
    {
        nutrient: "Iron",
        crops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton"
        ],
        symptoms: [
            "Young leaves becoming yellow",
            "Yellowing between leaf veins",
            "New growth appears pale",
            "Severe yellowing of young leaves"
        ],
        fertilizerOptions: [
            "Ferrous Sulphate"
        ],
        explanation:
            "Iron deficiency commonly appears on younger leaves and can cause interveinal yellowing while the leaf veins remain greener."
    },

    // =========================
    // MANGANESE
    // =========================
    {
        nutrient: "Manganese",
        crops: [
            "Wheat",
            "Rice",
            "Maize"
        ],
        symptoms: [
            "Yellowing between leaf veins",
            "Small brown or grey spots on leaves",
            "Reduced plant growth",
            "Pale young leaves"
        ],
        fertilizerOptions: [
            "Manganese Sulphate"
        ],
        explanation:
            "Manganese deficiency can cause interveinal chlorosis, spotting and reduced plant development."
    }
];

const seedDeficiencies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Clear existing deficiency records
        await NutrientDeficiency.deleteMany();

        // Insert fresh data
        await NutrientDeficiency.insertMany(deficiencyData);

        console.log(
            `${deficiencyData.length} nutrient deficiency records inserted successfully`
        );

        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    } catch (error) {
        console.error(
            "Error seeding deficiency data:",
            error.message
        );

        process.exit(1);
    }
};

seedDeficiencies();