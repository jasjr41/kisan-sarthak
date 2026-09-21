const axios = require("axios");
const generateRecommendations = require("../services/recommendationService");
const Crop = require("../models/crop");

const getWeather = async (req, res) => {
    try {
        const {
    city,
    lat,
    lon,
    crop,
    growthStage,
    soilType,
    farmingActivity
} = req.query;
        const cropData = await Crop.findOne({
            name: {
                $regex: `^${crop}$`,
                $options: "i"
            }
        }); if (!cropData) {
            return res.status(404).json({
                success: false,
                message: "Selected crop was not found"
            });
        }
        if (!soilType) {
            return res.status(400).json({
                success: false,
                message: "Soil type is required"
            });
        }

        if (!city && (!lat || !lon)) {
            return res.status(400).json({
                success: false,
                message: "City or location coordinates are required"
            });
        }

        // ==============================
        // CURRENT WEATHER
        // ==============================

        const currentWeatherUrl =
            "https://api.openweathermap.org/data/2.5/weather";

        const currentResponse = await axios.get(
            currentWeatherUrl,
            {
                params: {
                    ...(lat && lon
                        ? {
                            lat: lat,
                            lon: lon
                        }
                        : {
                            q: city
                        }
                    ),
                    appid: process.env.WEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        const data = currentResponse.data;

        const weather = {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            weather: data.weather[0].main,
            description: data.weather[0].description
        };


        // ==============================
        // 5 DAY FORECAST
        // ==============================

        const forecastUrl =
            "https://api.openweathermap.org/data/2.5/forecast";

        const forecastResponse = await axios.get(
            forecastUrl,
            {
                params: {
                    ...(lat && lon
                        ? {
                            lat: lat,
                            lon: lon
                        }
                        : {
                            q: city
                        }
                    ),
                    appid: process.env.WEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        const forecastData = forecastResponse.data;

        const forecast = forecastData.list.map((item) => ({
            date: item.dt_txt,
            temperature: item.main.temp,
            feelsLike: item.main.feels_like,
            humidity: item.main.humidity,
            weather: item.weather[0].main,
            description: item.weather[0].description,
            windSpeed: item.wind.speed,
            rain: item.rain?.["3h"] || 0
        }));


        // ==============================
        // FARMING RECOMMENDATIONS
        // ==============================

        const advice = generateRecommendations(
            weather,
            cropData,
            growthStage,
            forecast,
            soilType,
            farmingActivity
        );


        // ==============================
        // RESPONSE
        // ==============================

        res.json({
            success: true,
            data: {
                weather,
                forecast,
                crop: cropData,
                recommendations: advice.recommendations,
                alerts: advice.alerts
            }
        });

    } catch (error) {

        console.error(
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch weather data"
        });
    }
};

module.exports = {
    getWeather
};