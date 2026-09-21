const mongoose = require("mongoose");
require("dotenv").config();

const Fertilizer = require("../models/Fertilizer");

const fertilizers = [
    {
        name: "Urea",
        nutrient: "Nitrogen",
        composition: "46% Nitrogen",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton",
            "Mustard",
            "Sugarcane"
        ],
        suitableStages: [
            "vegetative",
            "flowering"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil",
            "Well-drained Soil"
        ],
        purpose: "Provides nitrogen required for healthy vegetative growth.",
        guidance:
            "Apply nitrogen based on soil testing and crop-specific recommendations. Avoid excessive application.",
        deficiencySymptoms: [
            "Yellowing of older leaves",
            "Poor vegetative growth",
            "Reduced plant development"
        ]
    },

    {
        name: "DAP",
        nutrient: "Nitrogen + Phosphorus",
        composition: "18% Nitrogen + 46% Phosphate (P2O5)",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton",
            "Mustard",
            "Sugarcane"
        ],
        suitableStages: [
            "sowing",
            "vegetative"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil",
            "Well-drained Soil"
        ],
        purpose:
            "Provides nitrogen and phosphorus to support early crop establishment and root development.",
        guidance:
            "Use according to soil-test results and crop nutrient recommendations, particularly where phosphorus is required.",
        deficiencySymptoms: [
            "Poor root development",
            "Slow early growth",
            "Dark or purplish foliage in some crops"
        ]
    },

    {
        name: "Single Super Phosphate (SSP)",
        nutrient: "Phosphorus + Sulphur",
        composition: "Approximately 16% P2O5 + approximately 11% Sulphur",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton",
            "Mustard",
            "Sugarcane"
        ],
        suitableStages: [
            "sowing",
            "vegetative"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil",
            "Well-drained Soil"
        ],
        purpose:
            "Supplies phosphorus and sulphur for root development and crop growth.",
        guidance:
            "Useful where phosphorus or sulphur is required according to soil-test recommendations.",
        deficiencySymptoms: [
            "Poor root growth",
            "Slow crop development",
            "Poor flowering or reproductive development"
        ]
    },

    {
        name: "Muriate of Potash (MOP)",
        nutrient: "Potassium",
        composition: "60% K2O",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton",
            "Mustard",
            "Sugarcane"
        ],
        suitableStages: [
            "sowing",
            "vegetative",
            "flowering"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil",
            "Well-drained Soil"
        ],
        purpose:
            "Provides potassium which supports plant strength, water regulation and crop quality.",
        guidance:
            "Apply according to soil potassium status and crop-specific recommendations.",
        deficiencySymptoms: [
            "Leaf-edge scorching",
            "Weak stems",
            "Poor crop quality"
        ]
    },

    {
        name: "Zinc Sulphate 21%",
        nutrient: "Zinc",
        composition: "21% Zinc",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton"
        ],
        suitableStages: [
            "sowing",
            "vegetative"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil",
            "Well-drained Soil"
        ],
        purpose:
            "Corrects confirmed zinc deficiency and supports normal plant growth.",
        guidance:
            "Use only when zinc deficiency is confirmed through soil testing or crop diagnosis.",
        deficiencySymptoms: [
            "Stunted growth",
            "Interveinal chlorosis",
            "Small leaves",
            "Poor plant development"
        ]
    },

    {
        name: "Zinc Sulphate 33%",
        nutrient: "Zinc",
        composition: "33% Zinc",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton"
        ],
        suitableStages: [
            "sowing",
            "vegetative"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil",
            "Well-drained Soil"
        ],
        purpose:
            "Provides concentrated zinc for correcting confirmed zinc deficiency.",
        guidance:
            "Apply according to soil-test results and locally recommended crop practices.",
        deficiencySymptoms: [
            "Stunted growth",
            "Yellowing between leaf veins",
            "Reduced plant development"
        ]
    },

    {
        name: "Ferrous Sulphate",
        nutrient: "Iron",
        composition: "Iron + Sulphur",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Potato",
            "Tomato",
            "Cotton"
        ],
        suitableStages: [
            "vegetative",
            "flowering"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil",
            "Well-drained Soil"
        ],
        purpose:
            "Used to address confirmed iron deficiency.",
        guidance:
            "Use after confirming iron deficiency and follow crop-specific recommendations.",
        deficiencySymptoms: [
            "Yellowing of younger leaves",
            "Interveinal chlorosis",
            "Reduced plant growth"
        ]
    },

    {
        name: "Manganese Sulphate",
        nutrient: "Manganese",
        composition: "Manganese + Sulphur",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize"
        ],
        suitableStages: [
            "vegetative"
        ],
        suitableSoils: [
            "Loamy",
            "Sandy Loam",
            "Well-drained Soil"
        ],
        purpose:
            "Used to correct confirmed manganese deficiency.",
        guidance:
            "Apply only when manganese deficiency has been established through appropriate soil or crop diagnosis.",
        deficiencySymptoms: [
            "Interveinal chlorosis",
            "Reduced plant growth",
            "Weak crop development"
        ]
    },

    {
        name: "Gypsum",
        nutrient: "Sulphur + Calcium",
        composition: "Calcium sulphate",
        suitableCrops: [
            "Wheat",
            "Rice",
            "Maize",
            "Mustard",
            "Sugarcane",
            "Cotton"
        ],
        suitableStages: [
            "sowing",
            "vegetative"
        ],
        suitableSoils: [
            "Loamy",
            "Clay",
            "Clay Loam",
            "Sandy Loam",
            "Black Soil"
        ],
        purpose:
            "Provides sulphur and calcium and can be useful where sulphur deficiency is identified.",
        guidance:
            "Use based on soil-test results and crop-specific nutrient recommendations.",
        deficiencySymptoms: [
            "Poor growth",
            "Pale younger leaves",
            "Reduced crop development"
        ]
    }
];

const seedFertilizers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Fertilizer.deleteMany();

        await Fertilizer.insertMany(fertilizers);

        console.log("Fertilizer data inserted successfully");

        await mongoose.connection.close();

        console.log("MongoDB connection closed");

    } catch (error) {
        console.error("Error seeding fertilizers:", error.message);
        process.exit(1);
    }
};

seedFertilizers();