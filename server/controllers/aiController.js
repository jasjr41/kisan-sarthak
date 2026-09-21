const axios = require("axios");

const Farm = require("../models/Farm");
const Crop = require("../models/crop");
const FarmingHistory = require("../models/FarmingHistory");

const {
    generateAIResponse
} = require("../services/aiService");

const {
    generateRecommendations
} = require("../services/recommendationService");


const chatWithAI = async (req, res) => {
    try {

        const { message } = req.body;

        // -----------------------------------
        // 1. Validate question
        // -----------------------------------

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please enter a question."
            });
        }


        // -----------------------------------
        // 2. Get logged-in farmer
        // -----------------------------------

        const userId = req.user.userId;


        // -----------------------------------
        // 3. Get farm profile
        // -----------------------------------

        const farm = await Farm.findOne({
            user: userId
        }).lean();


        // -----------------------------------
        // 4. Get farming history
        // -----------------------------------

        const farmingHistory = await FarmingHistory.find({
            user: userId
        })
            .sort({ date: -1 })
            .limit(10)
            .lean();


        // -----------------------------------
        // 5. Prepare farm information
        // -----------------------------------

        let weather = {};
        let forecast = [];
        let recommendations = [];
        let cropData = null;


        if (farm) {

            const city = farm.location;

            const cropName = farm.crop;

            const growthStage = farm.growthStage;

            const soilType = farm.soilType;

            const farmingActivity =
                farm.farmingActivity || "general";


            // -----------------------------------
            // 6. Find crop information
            // -----------------------------------

            cropData = await Crop.findOne({
                name: {
                    $regex: `^${cropName}$`,
                    $options: "i"
                }
            }).lean();


            // -----------------------------------
            // 7. Get current weather
            // -----------------------------------

            if (city && process.env.WEATHER_API_KEY) {

                const currentWeatherResponse =
                    await axios.get(
                        "https://api.openweathermap.org/data/2.5/weather",
                        {
                            params: {
                                q: city,
                                appid: process.env.WEATHER_API_KEY,
                                units: "metric"
                            }
                        }
                    );


                const current =
                    currentWeatherResponse.data;


                weather = {
                    city: current.name,
                    country: current.sys?.country,

                    temperature:
                        current.main?.temp,

                    feelsLike:
                        current.main?.feels_like,

                    humidity:
                        current.main?.humidity,

                    pressure:
                        current.main?.pressure,

                    windSpeed:
                        current.wind?.speed,

                    condition:
                        current.weather?.[0]?.main,

                    description:
                        current.weather?.[0]?.description
                };


                // -----------------------------------
                // 8. Get weather forecast
                // -----------------------------------

                const forecastResponse =
                    await axios.get(
                        "https://api.openweathermap.org/data/2.5/forecast",
                        {
                            params: {
                                q: city,
                                appid: process.env.WEATHER_API_KEY,
                                units: "metric"
                            }
                        }
                    );


                const forecastData =
                    forecastResponse.data;


                forecast =
                    (forecastData.list || [])
                        .slice(0, 40)
                        .map((item) => ({
                            date: item.dt_txt,

                            temperature:
                                item.main?.temp,

                            feelsLike:
                                item.main?.feels_like,

                            humidity:
                                item.main?.humidity,

                            weather:
                                item.weather?.[0]?.main,

                            description:
                                item.weather?.[0]?.description,

                            windSpeed:
                                item.wind?.speed,

                            rain:
                                item.rain?.["3h"] || 0
                        }));


                // -----------------------------------
                // 9. Generate existing recommendations
                // -----------------------------------

                const advice =
                    generateRecommendations(
                        weather,
                        cropData,
                        growthStage,
                        forecast,
                        soilType,
                        farmingActivity
                    );


                recommendations =
                    advice?.recommendations || [];

            }
        }


        // -----------------------------------
        // 10. Send complete context to Gemini
        // -----------------------------------

        const answer =
            await generateAIResponse({

                question: message.trim(),

                farmer: {
                    userId
                },

                farm: farm || {},

                weather,

                forecast,

                recommendations,

                farmingHistory
            });


        // -----------------------------------
        // 11. Return AI response
        // -----------------------------------

        return res.status(200).json({
            success: true,
            message: answer,

            context: {
                farmAvailable: !!farm,
                weatherAvailable:
                    Object.keys(weather).length > 0,
                forecastAvailable:
                    forecast.length > 0,
                recommendationsAvailable:
                    recommendations.length > 0
            }
        });


    } catch (error) {

        console.error(
            "AI Controller Error:",
            error.response?.data ||
            error.message
        );


        return res.status(500).json({
            success: false,
            message:
                "Unable to generate AI response right now."
        });
    }
};


module.exports = {
    chatWithAI
};
