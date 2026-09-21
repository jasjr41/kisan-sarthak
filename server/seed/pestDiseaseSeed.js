const mongoose = require("mongoose");
const PestDisease = require("../models/PestDisease");
require("dotenv").config();

const pestDiseaseData = [

    // =========================
    // WHEAT
    // =========================

    {
        name: "Aphids",
        type: "Pest",
        crops: ["Wheat"],
        symptoms: [
            "Small insects clustered on leaves or stems",
            "Curling or yellowing leaves",
            "Reduced plant growth"
        ],
        favorableConditions: [
            "Cool and relatively dry weather",
            "Dense crop growth"
        ],
        prevention: [
            "Regularly inspect leaves and stems",
            "Maintain balanced fertilizer application",
            "Encourage natural predators"
        ],
        management: [
            "Monitor pest population regularly",
            "Use suitable pest-control measures when infestation reaches damaging levels"
        ],
        severity: "Medium"
    },

    {
        name: "Wheat Rust",
        type: "Disease",
        crops: ["Wheat"],
        symptoms: [
            "Orange, yellow or brown rust-colored spots",
            "Small pustules on leaves",
            "Premature drying of leaves"
        ],
        favorableConditions: [
            "Moderate temperatures",
            "High humidity",
            "Leaf wetness"
        ],
        prevention: [
            "Use resistant varieties where available",
            "Maintain proper crop management",
            "Monitor fields regularly"
        ],
        management: [
            "Remove heavily affected plant material where practical",
            "Follow locally recommended fungicide management when required"
        ],
        severity: "High"
    },

    {
        name: "Termites",
        type: "Pest",
        crops: ["Wheat"],
        symptoms: [
            "Wilting plants",
            "Damaged roots",
            "Plants can be easily pulled from the soil"
        ],
        favorableConditions: [
            "Dry soil conditions",
            "Low soil moisture"
        ],
        prevention: [
            "Maintain suitable soil moisture",
            "Remove crop residues where appropriate",
            "Monitor fields for termite activity"
        ],
        management: [
            "Identify affected areas early",
            "Use locally recommended termite-management practices"
        ],
        severity: "Medium"
    },

    // =========================
    // RICE
    // =========================

    {
        name: "Rice Stem Borer",
        type: "Pest",
        crops: ["Rice"],
        symptoms: [
            "Dead hearts in young plants",
            "White earheads in mature plants",
            "Borer damage inside stems"
        ],
        favorableConditions: [
            "Warm weather",
            "Dense crop growth",
            "Excessive nitrogen application"
        ],
        prevention: [
            "Regularly inspect plants",
            "Avoid excessive nitrogen application",
            "Maintain proper field sanitation"
        ],
        management: [
            "Monitor for dead hearts and white earheads",
            "Follow locally recommended pest-management practices"
        ],
        severity: "High"
    },

    {
        name: "Rice Blast",
        type: "Disease",
        crops: ["Rice"],
        symptoms: [
            "Spindle-shaped spots on leaves",
            "Gray or white centers with darker margins",
            "Neck infection causing panicle damage"
        ],
        favorableConditions: [
            "High humidity",
            "Frequent rainfall",
            "Leaf wetness"
        ],
        prevention: [
            "Use resistant varieties where available",
            "Avoid excessive nitrogen application",
            "Maintain balanced crop nutrition"
        ],
        management: [
            "Monitor leaves and panicles regularly",
            "Use locally recommended fungicide management when required"
        ],
        severity: "High"
    },

    {
        name: "Brown Planthopper",
        type: "Pest",
        crops: ["Rice"],
        symptoms: [
            "Yellowing of plants",
            "Wilting and drying of plants",
            "Hopper population near the base of plants"
        ],
        favorableConditions: [
            "Warm and humid weather",
            "Dense crop canopy",
            "Excessive nitrogen"
        ],
        prevention: [
            "Avoid excessive nitrogen application",
            "Maintain proper plant spacing",
            "Regularly monitor the crop"
        ],
        management: [
            "Monitor pest population near the plant base",
            "Follow integrated pest-management practices"
        ],
        severity: "High"
    },

    // =========================
    // MAIZE
    // =========================

    {
        name: "Fall Armyworm",
        type: "Pest",
        crops: ["Maize"],
        symptoms: [
            "Irregular holes in leaves",
            "Damage concentrated around the whorl",
            "Presence of caterpillars or frass"
        ],
        favorableConditions: [
            "Warm weather",
            "Dense crop growth",
            "Suitable moisture conditions"
        ],
        prevention: [
            "Inspect young plants regularly",
            "Remove severely damaged plant material where practical",
            "Maintain field sanitation"
        ],
        management: [
            "Monitor maize whorls regularly",
            "Use locally recommended integrated pest-management measures"
        ],
        severity: "High"
    },

    {
        name: "Maize Leaf Blight",
        type: "Disease",
        crops: ["Maize"],
        symptoms: [
            "Long brown or gray lesions on leaves",
            "Leaf drying",
            "Reduced photosynthetic area"
        ],
        favorableConditions: [
            "Warm humid weather",
            "Frequent rainfall",
            "Extended leaf wetness"
        ],
        prevention: [
            "Use resistant varieties where available",
            "Maintain field sanitation",
            "Avoid excessive crop density"
        ],
        management: [
            "Monitor leaves regularly",
            "Use locally recommended disease-management practices when necessary"
        ],
        severity: "Medium"
    },

    // =========================
    // POTATO
    // =========================

    {
        name: "Potato Late Blight",
        type: "Disease",
        crops: ["Potato"],
        symptoms: [
            "Dark water-soaked spots on leaves",
            "Brown lesions on stems",
            "Rapid leaf destruction"
        ],
        favorableConditions: [
            "Cool and humid weather",
            "Frequent rainfall",
            "Extended leaf wetness"
        ],
        prevention: [
            "Maintain proper field drainage",
            "Avoid prolonged leaf wetness where possible",
            "Use resistant varieties where available"
        ],
        management: [
            "Monitor fields frequently during favorable weather",
            "Follow locally recommended fungicide management when required"
        ],
        severity: "High"
    },

    {
        name: "Potato Aphids",
        type: "Pest",
        crops: ["Potato"],
        symptoms: [
            "Small insects on young leaves",
            "Leaf curling",
            "Sticky honeydew on plant surfaces"
        ],
        favorableConditions: [
            "Moderate temperatures",
            "Dense plant growth"
        ],
        prevention: [
            "Regular crop inspection",
            "Encourage beneficial insects",
            "Maintain balanced plant nutrition"
        ],
        management: [
            "Monitor aphid populations",
            "Use locally recommended pest-management practices when necessary"
        ],
        severity: "Medium"
    },

    // =========================
    // TOMATO
    // =========================

    {
        name: "Tomato Leaf Curl",
        type: "Disease",
        crops: ["Tomato"],
        symptoms: [
            "Upward curling of leaves",
            "Leaf yellowing",
            "Stunted plant growth"
        ],
        favorableConditions: [
            "Warm weather",
            "Presence of insect vectors",
            "Poor field sanitation"
        ],
        prevention: [
            "Monitor plants regularly",
            "Control insect vectors using integrated pest management",
            "Remove severely affected plants where appropriate"
        ],
        management: [
            "Inspect plants and nearby weeds",
            "Follow locally recommended vector-management practices"
        ],
        severity: "High"
    },

    {
        name: "Tomato Early Blight",
        type: "Disease",
        crops: ["Tomato"],
        symptoms: [
            "Dark circular spots on older leaves",
            "Concentric ring patterns",
            "Premature leaf drop"
        ],
        favorableConditions: [
            "Warm humid weather",
            "Frequent rainfall",
            "Leaf wetness"
        ],
        prevention: [
            "Maintain proper plant spacing",
            "Remove infected plant debris",
            "Avoid unnecessary leaf wetness"
        ],
        management: [
            "Monitor older leaves regularly",
            "Use locally recommended disease-management practices"
        ],
        severity: "Medium"
    },

    // =========================
    // COTTON
    // =========================

    {
        name: "Cotton Aphids",
        type: "Pest",
        crops: ["Cotton"],
        symptoms: [
            "Aphids clustered on young leaves",
            "Leaf curling",
            "Sticky honeydew on leaves"
        ],
        favorableConditions: [
            "Moderate temperatures",
            "Dense plant growth"
        ],
        prevention: [
            "Inspect young leaves regularly",
            "Encourage natural predators",
            "Avoid excessive nitrogen"
        ],
        management: [
            "Monitor aphid population",
            "Use integrated pest-management measures when necessary"
        ],
        severity: "Medium"
    },

    {
        name: "Cotton Bollworm",
        type: "Pest",
        crops: ["Cotton"],
        symptoms: [
            "Holes in flower buds and bolls",
            "Damaged flowers",
            "Caterpillars around bolls"
        ],
        favorableConditions: [
            "Warm weather",
            "Flowering and boll development",
            "Suitable crop canopy"
        ],
        prevention: [
            "Regularly inspect flowers and bolls",
            "Use integrated pest management",
            "Remove heavily damaged material where practical"
        ],
        management: [
            "Monitor flowering and boll stages carefully",
            "Follow locally recommended bollworm-management practices"
        ],
        severity: "High"
    },

    // =========================
    // MUSTARD
    // =========================

    {
        name: "Mustard Aphids",
        type: "Pest",
        crops: ["Mustard"],
        symptoms: [
            "Clusters of small insects on shoots and flowers",
            "Leaf curling",
            "Weak plant growth"
        ],
        favorableConditions: [
            "Cool weather",
            "Dense crop growth",
            "Flowering stage"
        ],
        prevention: [
            "Regularly inspect shoots and flowers",
            "Encourage natural predators",
            "Avoid excessive nitrogen"
        ],
        management: [
            "Monitor aphid population during flowering",
            "Use locally recommended pest-management practices"
        ],
        severity: "High"
    },

    {
        name: "Mustard White Rust",
        type: "Disease",
        crops: ["Mustard"],
        symptoms: [
            "White blister-like spots on leaves",
            "White growth on lower leaf surfaces",
            "Distorted plant parts"
        ],
        favorableConditions: [
            "Cool humid weather",
            "Frequent rainfall",
            "Leaf wetness"
        ],
        prevention: [
            "Use healthy seed",
            "Maintain proper crop spacing",
            "Monitor fields during humid weather"
        ],
        management: [
            "Remove severely affected material where practical",
            "Follow locally recommended disease-management practices"
        ],
        severity: "Medium"
    },

    // =========================
    // SUGARCANE
    // =========================

    {
        name: "Sugarcane Early Shoot Borer",
        type: "Pest",
        crops: ["Sugarcane"],
        symptoms: [
            "Dead hearts in young shoots",
            "Borer holes in shoots",
            "Drying of central leaves"
        ],
        favorableConditions: [
            "Warm weather",
            "Young crop stage",
            "Dry field conditions"
        ],
        prevention: [
            "Regular field inspection",
            "Maintain field sanitation",
            "Use healthy planting material"
        ],
        management: [
            "Remove severely affected shoots where practical",
            "Follow locally recommended borer-management practices"
        ],
        severity: "High"
    },

    {
        name: "Sugarcane Red Rot",
        type: "Disease",
        crops: ["Sugarcane"],
        symptoms: [
            "Yellowing and drying of leaves",
            "Red discoloration inside infected stalks",
            "Reddish tissue with pale patches"
        ],
        favorableConditions: [
            "Warm humid weather",
            "Poor drainage",
            "Continuous cultivation of susceptible varieties"
        ],
        prevention: [
            "Use healthy disease-free planting material",
            "Maintain proper field drainage",
            "Use resistant varieties where available"
        ],
        management: [
            "Remove severely infected plants",
            "Avoid using infected stalks as planting material",
            "Follow locally recommended disease-management practices"
        ],
        severity: "High"
    }
];

const seedPestDisease = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await PestDisease.deleteMany({});

        await PestDisease.insertMany(pestDiseaseData);

        console.log(
            `${pestDiseaseData.length} pest and disease records inserted successfully`
        );

        await mongoose.disconnect();

        console.log("MongoDB disconnected");
    } catch (error) {
        console.error(
            "Error seeding pest and disease data:",
            error.message
        );

        process.exit(1);
    }
};

seedPestDisease();