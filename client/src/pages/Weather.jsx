import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

function Weather() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /*
     * Automatically detect user's location
     * and fetch weather data
     */
    useEffect(() => {
        let cancelled = false;

        const loadWeather = async (latitude, longitude) => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/weather/dashboard`,
                    {
                        params: {
                            lat: latitude,
                            lon: longitude,
                        },
                    }
                );

                if (!cancelled) {
                    setWeatherData(response.data.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Weather fetch error:", err);

                if (!cancelled) {
                    setError(
                        err.response?.data?.message ||
                            "Unable to fetch weather data."
                    );

                    setLoading(false);
                }
            }
        };

        if (!navigator.geolocation) {
            const timer = setTimeout(() => {
                if (!cancelled) {
                    setError(
                        "Location detection is not supported by your browser."
                    );
                    setLoading(false);
                }
            }, 0);

            return () => {
                cancelled = true;
                clearTimeout(timer);
            };
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (cancelled) return;

                const { latitude, longitude } = position.coords;

                loadWeather(latitude, longitude);
            },
            (locationError) => {
                console.error("Geolocation error:", locationError);

                if (!cancelled) {
                    setError(
                        "Location permission is required to show your local weather."
                    );

                    setLoading(false);
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );

        return () => {
            cancelled = true;
        };
    }, [API_URL]);

    /*
     * Convert 3-hour forecast into daily forecast
     */
    const dailyForecast = useMemo(() => {
        if (!weatherData?.forecast) {
            return [];
        }

        const grouped = {};

        weatherData.forecast.forEach((item) => {
            const date = item.date.split(" ")[0];

            if (!grouped[date]) {
                grouped[date] = {
                    date,
                    temperatures: [],
                    humidity: [],
                    rain: 0,
                    wind: [],
                    weather: item.weather,
                    description: item.description,
                };
            }

            grouped[date].temperatures.push(item.temperature);
            grouped[date].humidity.push(item.humidity);
            grouped[date].rain += Number(item.rain || 0);
            grouped[date].wind.push(item.windSpeed);
        });

        return Object.values(grouped)
            .slice(0, 5)
            .map((day) => ({
                date: day.date,

                minTemp: Math.round(
                    Math.min(...day.temperatures)
                ),

                maxTemp: Math.round(
                    Math.max(...day.temperatures)
                ),

                humidity: Math.round(
                    day.humidity.reduce(
                        (sum, value) => sum + value,
                        0
                    ) / day.humidity.length
                ),

                rain: Number(day.rain.toFixed(1)),

                wind: Number(
                    (
                        day.wind.reduce(
                            (sum, value) => sum + value,
                            0
                        ) / day.wind.length
                    ).toFixed(1)
                ),

                weather: day.weather,
                description: day.description,
            }));
    }, [weatherData]);

    /*
     * Chart data
     */
    const chartData = useMemo(() => {
        if (!weatherData?.forecast) {
            return [];
        }

        return weatherData.forecast.map((item) => ({
            time: item.date.substring(5, 16),

            temperature: Number(
                Number(item.temperature).toFixed(1)
            ),

            humidity: Number(item.humidity),

            rain: Number(item.rain || 0),

            wind: Number(
                Number(item.windSpeed).toFixed(1)
            ),
        }));
    }, [weatherData]);

    /*
     * Weather icon
     */
    const getWeatherIcon = (condition) => {
        const value = condition?.toLowerCase() || "";

        if (value.includes("thunder")) {
            return "⛈️";
        }

        if (value.includes("rain")) {
            return "🌧️";
        }

        if (value.includes("drizzle")) {
            return "🌦️";
        }

        if (value.includes("cloud")) {
            return "☁️";
        }

        if (value.includes("snow")) {
            return "❄️";
        }

        if (value.includes("clear")) {
            return "☀️";
        }

        return "🌤️";
    };

    /*
     * Format date
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    };

    /*
     * Loading screen
     */
    if (loading) {
        return (
            <div className="weather-page">
                <div className="weather-loading">
                    <div className="weather-spinner"></div>

                    <h2>
                        Detecting your location...
                    </h2>

                    <p>
                        Getting the latest weather information.
                    </p>
                </div>
            </div>
        );
    }

    /*
     * Error screen
     */
    if (error) {
        return (
            <div className="weather-page">
                <div className="weather-error-page">
                    <div className="weather-error-icon">
                        📍
                    </div>

                    <h2>
                        Unable to get your weather
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        🔄 Try Again
                    </button>
                </div>
            </div>
        );
    }

    /*
     * Main weather page
     */
    return (
        <div className="weather-page">

            {/* HEADER */}
            <section className="weather-header">
                <div>
                    <p className="weather-eyebrow">
                        🌦️ LOCAL WEATHER
                    </p>

                    <h1>
                        Weather
                    </h1>

                    <p>
                        Live weather conditions and 5-day forecast
                    </p>
                </div>

                {weatherData?.weather && (
                    <div className="weather-location">
                        📍 {weatherData.weather.city},{" "}
                        {weatherData.weather.country}
                    </div>
                )}
            </section>

            {/* CURRENT WEATHER */}
            {weatherData?.weather && (
                <section className="current-weather-section">

                    <div className="current-weather-main">
                        <div className="current-weather-icon">
                            {getWeatherIcon(
                                weatherData.weather.weather
                            )}
                        </div>

                        <div>
                            <p className="current-weather-label">
                                Current Weather
                            </p>

                            <h2>
                                {Math.round(
                                    weatherData.weather.temperature
                                )}
                                °C
                            </h2>

                            <p className="current-condition">
                                {weatherData.weather.description}
                            </p>
                        </div>
                    </div>

                    <div className="current-weather-stats">

                        {/* FEELS LIKE */}
                        <div className="weather-stat">
                            <span>🌡️</span>

                            <div>
                                <small>
                                    Feels Like
                                </small>

                                <strong>
                                    {Math.round(
                                        weatherData.weather.feelsLike
                                    )}
                                    °C
                                </strong>
                            </div>
                        </div>

                        {/* HUMIDITY */}
                        <div className="weather-stat">
                            <span>💧</span>

                            <div>
                                <small>
                                    Humidity
                                </small>

                                <strong>
                                    {weatherData.weather.humidity}%
                                </strong>
                            </div>
                        </div>

                        {/* WIND */}
                        <div className="weather-stat">
                            <span>💨</span>

                            <div>
                                <small>
                                    Wind
                                </small>

                                <strong>
                                    {weatherData.weather.windSpeed}{" "}
                                    m/s
                                </strong>
                            </div>
                        </div>

                        {/* PRESSURE */}
                        <div className="weather-stat">
                            <span>⏱️</span>

                            <div>
                                <small>
                                    Pressure
                                </small>

                                <strong>
                                    {weatherData.weather.pressure}{" "}
                                    hPa
                                </strong>
                            </div>
                        </div>

                    </div>
                </section>
            )}

            {/* 5 DAY FORECAST */}
            <section className="weather-section">

                <div className="section-title">
                    <div>
                        <span>📅</span>

                        <div>
                            <h2>
                                5-Day Forecast
                            </h2>

                            <p>
                                Weather forecast for your location
                            </p>
                        </div>
                    </div>
                </div>

                <div className="forecast-grid">

                    {dailyForecast.map((day) => (
                        <div
                            className="forecast-day-card"
                            key={day.date}
                        >
                            <h3>
                                {formatDate(day.date)}
                            </h3>

                            <div className="forecast-icon">
                                {getWeatherIcon(day.weather)}
                            </div>

                            <p className="forecast-condition">
                                {day.description}
                            </p>

                            <div className="forecast-temperature">
                                <strong>
                                    {day.maxTemp}°
                                </strong>

                                <span>
                                    {day.minTemp}°
                                </span>
                            </div>

                            <div className="forecast-details">

                                <div>
                                    💧
                                    <span>
                                        {day.humidity}%
                                    </span>
                                </div>

                                <div>
                                    🌧️
                                    <span>
                                        {day.rain} mm
                                    </span>
                                </div>

                                <div>
                                    💨
                                    <span>
                                        {day.wind} m/s
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </section>

            {/* TEMPERATURE CHART */}
            <section className="weather-chart-card">

                <div className="section-title">
                    <div>
                        <span>🌡️</span>

                        <div>
                            <h2>
                                Temperature
                            </h2>

                            <p>
                                Temperature forecast
                            </p>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >
                    <LineChart data={chartData}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="time"
                        />

                        <YAxis
                            unit="°C"
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#16a34a"
                            strokeWidth={3}
                            dot={false}
                        />

                    </LineChart>
                </ResponsiveContainer>

            </section>

            {/* HUMIDITY + RAIN */}
            <div className="weather-chart-grid">

                {/* HUMIDITY */}
                <section className="weather-chart-card">

                    <div className="section-title">
                        <div>
                            <span>💧</span>

                            <div>
                                <h2>
                                    Humidity
                                </h2>

                                <p>
                                    Humidity forecast
                                </p>
                            </div>
                        </div>
                    </div>

                    <ResponsiveContainer
                        width="100%"
                        height={280}
                    >
                        <LineChart data={chartData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="time"
                            />

                            <YAxis
                                unit="%"
                            />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="humidity"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={false}
                            />

                        </LineChart>
                    </ResponsiveContainer>

                </section>

                {/* RAINFALL */}
                <section className="weather-chart-card">

                    <div className="section-title">
                        <div>
                            <span>🌧️</span>

                            <div>
                                <h2>
                                    Rainfall
                                </h2>

                                <p>
                                    Expected precipitation
                                </p>
                            </div>
                        </div>
                    </div>

                    <ResponsiveContainer
                        width="100%"
                        height={280}
                    >
                        <BarChart data={chartData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="time"
                            />

                            <YAxis
                                unit=" mm"
                            />

                            <Tooltip />

                            <Bar
                                dataKey="rain"
                                fill="#0ea5e9"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>
                    </ResponsiveContainer>

                </section>

            </div>

        </div>
    );
}

export default Weather;