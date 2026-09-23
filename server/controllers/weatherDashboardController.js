const axios = require("axios");

const getWeatherDashboard = async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({
                success: false,
                message: "Location coordinates are required"
            });
        }

        /*
         * Current weather
         */
        const currentResponse = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    lat,
                    lon,
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

        /*
         * 5-day / 3-hour forecast
         */
        const forecastResponse = await axios.get(
            "https://api.openweathermap.org/data/2.5/forecast",
            {
                params: {
                    lat,
                    lon,
                    appid: process.env.WEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        const forecast = forecastResponse.data.list.map(
            (item) => ({
                date: item.dt_txt,
                temperature: item.main.temp,
                feelsLike: item.main.feels_like,
                humidity: item.main.humidity,
                weather: item.weather[0].main,
                description: item.weather[0].description,
                windSpeed: item.wind.speed,
                rain: item.rain?.["3h"] || 0
            })
        );

        res.json({
            success: true,
            data: {
                weather,
                forecast
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
    getWeatherDashboard
};