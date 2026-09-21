const mongoose = require("mongoose");
require("dotenv").config();

const Crop = require("./models/crop");

const crops = [
    {
        name: "Wheat",

        temperature: {
            min: 10,
            max: 25
        },

        soilTypes: [
            "Loamy",
            "Clay Loam",
            "Well-drained Soil"
        ],

        waterRequirement: "Moderate",

        growthStages: [
            "sowing",
            "vegetative",
            "flowering",
            "maturity",
            "harvesting"
        ],

        irrigationGuidance:
            "Provide irrigation according to soil moisture and crop growth stage. Avoid excessive irrigation to prevent waterlogging.",

        fertilizerGuidance:
            "Apply nitrogen, phosphorus and potassium according to soil condition and recommended crop practices. Nitrogen is particularly important during vegetative growth.",

        weatherRisks: [
            "Extreme heat",
            "Frost",
            "Heavy rainfall",
            "Waterlogging",
            "Strong winds"
        ],

        cropProtection:
            "Monitor the crop regularly for weeds, fungal diseases and insect pests. Avoid unnecessary pesticide application during windy or rainy conditions."
    },

    {
        name: "Rice",

        temperature: {
            min: 20,
            max: 35
        },

        soilTypes: [
            "Clay",
            "Clay Loam",
            "Loamy Soil"
        ],

        waterRequirement: "High",

        growthStages: [
            "sowing",
            "vegetative",
            "flowering",
            "maturity",
            "harvesting"
        ],

        irrigationGuidance:
            "Maintain adequate soil moisture and water levels according to the crop growth stage. Avoid unnecessary continuous flooding where appropriate.",

        fertilizerGuidance:
            "Use nitrogen, phosphorus and potassium based on soil testing and crop requirements. Split nitrogen application can improve nutrient use efficiency.",

        weatherRisks: [
            "Extreme heat",
            "Heavy rainfall",
            "Strong winds",
            "Waterlogging",
            "Dry periods"
        ],

        cropProtection:
            "Monitor regularly for pests and fungal diseases. Maintain proper field drainage during excessive rainfall and avoid spraying pesticides during rain or strong winds."
    },

    {
        name: "Maize",

        temperature: {
            min: 18,
            max: 32
        },

        soilTypes: [
            "Loamy",
            "Sandy Loam",
            "Well-drained Soil"
        ],

        waterRequirement: "Moderate",

        growthStages: [
            "sowing",
            "vegetative",
            "flowering",
            "maturity",
            "harvesting"
        ],

        irrigationGuidance:
            "Maintain adequate soil moisture, especially during germination, flowering and grain development. Increase monitoring during hot and dry weather.",

        fertilizerGuidance:
            "Apply balanced nitrogen, phosphorus and potassium according to soil conditions. Nitrogen demand is generally higher during active vegetative growth.",

        weatherRisks: [
            "Extreme heat",
            "Drought",
            "Heavy rainfall",
            "Strong winds",
            "Waterlogging"
        ],

        cropProtection:
            "Regularly monitor for stem borers, fall armyworm and fungal diseases. Avoid pesticide spraying during rainfall or strong winds."
    },

    {
        name: "Potato",

        temperature: {
            min: 15,
            max: 25
        },

        soilTypes: [
            "Sandy Loam",
            "Loamy",
            "Well-drained Soil"
        ],

        waterRequirement: "Moderate",

        growthStages: [
            "sowing",
            "vegetative",
            "flowering",
            "maturity",
            "harvesting"
        ],

        irrigationGuidance:
            "Maintain consistent soil moisture but avoid excessive irrigation. Good drainage is important because waterlogging can damage tubers.",

        fertilizerGuidance:
            "Apply balanced nutrients based on soil testing. Potassium is important for tuber development and crop quality.",

        weatherRisks: [
            "High temperature",
            "Heavy rainfall",
            "Waterlogging",
            "High humidity",
            "Fungal diseases"
        ],

        cropProtection:
            "Monitor for late blight and insect pests. High humidity and prolonged leaf wetness can increase fungal disease risk."
    },

    {
        name: "Tomato",

        temperature: {
            min: 18,
            max: 30
        },

        soilTypes: [
            "Loamy",
            "Sandy Loam",
            "Well-drained Soil"
        ],

        waterRequirement: "Moderate",

        growthStages: [
            "sowing",
            "vegetative",
            "flowering",
            "maturity",
            "harvesting"
        ],

        irrigationGuidance:
            "Maintain consistent soil moisture and avoid both drought stress and excessive irrigation. Water near the root zone when possible.",

        fertilizerGuidance:
            "Use balanced nutrients according to soil testing and crop stage. Adequate potassium supports fruit development and quality.",

        weatherRisks: [
            "Extreme heat",
            "Heavy rainfall",
            "High humidity",
            "Fungal diseases",
            "Strong winds"
        ],

        cropProtection:
            "Regularly inspect leaves and fruits for pests and diseases. Avoid overhead irrigation when disease pressure is high and avoid pesticide spraying during rain or strong winds."
    },

    {
        name: "Cotton",

        temperature: {
            min: 21,
            max: 35
        },

        soilTypes: [
            "Black Soil",
            "Loamy",
            "Sandy Loam"
        ],

        waterRequirement: "Moderate",

        growthStages: [
            "sowing",
            "vegetative",
            "flowering",
            "maturity",
            "harvesting"
        ],

        irrigationGuidance:
            "Provide irrigation according to soil moisture and crop stage. Flowering and boll development require careful moisture management.",

        fertilizerGuidance:
            "Apply nitrogen, phosphorus and potassium according to soil test results and crop requirements. Avoid excessive nitrogen application.",

        weatherRisks: [
            "Extreme heat",
            "Drought",
            "Heavy rainfall",
            "Strong winds",
            "Pest outbreaks"
        ],

        cropProtection:
            "Monitor regularly for bollworms, sucking pests and other crop threats. Follow integrated pest management practices and avoid unnecessary pesticide application."
    },
    {
    name: "Mustard",

    temperature: {
        min: 10,
        max: 25
    },

    soilTypes: [
        "Loamy",
        "Sandy Loam",
        "Well-drained Soil"
    ],

    waterRequirement: "Low to Moderate",

    growthStages: [
        "sowing",
        "vegetative",
        "flowering",
        "maturity",
        "harvesting"
    ],

    irrigationGuidance:
        "Provide irrigation according to soil moisture and crop growth stage. Avoid excessive irrigation, especially during periods of rainfall, to prevent waterlogging.",

    fertilizerGuidance:
        "Apply nitrogen, phosphorus and potassium according to soil testing and crop requirements. Sulphur is also important for healthy growth and oilseed development.",

    weatherRisks: [
        "Extreme heat",
        "Frost",
        "Heavy rainfall",
        "Waterlogging",
        "Strong winds"
    ],

    cropProtection:
        "Monitor the crop for aphids, fungal diseases and other pests. Maintain proper field drainage and avoid pesticide spraying during rainfall or strong winds."
},{
    name: "Sugarcane",

    temperature: {
        min: 20,
        max: 35
    },

    soilTypes: [
        "Loamy",
        "Clay Loam",
        "Well-drained Soil"
    ],

    waterRequirement: "High",

    growthStages: [
        "sowing",
        "vegetative",
        "flowering",
        "maturity",
        "harvesting"
    ],

    irrigationGuidance:
        "Maintain adequate soil moisture throughout crop development, especially during early growth and active vegetative growth. Avoid excessive irrigation and waterlogging.",

    fertilizerGuidance:
        "Apply nitrogen, phosphorus and potassium according to soil testing and crop requirements. Nitrogen is particularly important during active vegetative growth.",

    weatherRisks: [
        "Extreme heat",
        "Drought",
        "Heavy rainfall",
        "Waterlogging",
        "Strong winds"
    ],

    cropProtection:
        "Monitor regularly for early shoot borer, top borer, termites and fungal diseases. Maintain field sanitation and avoid unnecessary pesticide application during rainy or windy conditions."
},
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Crop.deleteMany();

        await Crop.insertMany(crops);

        console.log("Crop data inserted successfully");

        await mongoose.connection.close();

        console.log("Database connection closed");

    } catch (error) {
        console.error("Error seeding crop data:", error.message);
        process.exit(1);
    }
};

seedDatabase();