import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import RecommendationCard from "./components/RecommendationCard";
import AlertCard from "./components/AlertCard";
import ForecastCard from "./components/ForecastCard";
import CropInfoCard from "./components/CropInfoCard";
import StatsCard from "./components/StatsCard";
import Loading from "./components/Loading";
import WeatherCharts from "./components/WeatherCharts";
import AIChat from "./components/AIChat";

import FarmProfile from "./pages/FarmProfile";
import FertilizerAdvisor from "./pages/FertilizerAdvisor";
import PestDiseaseAdvisor from "./pages/PestDiseaseAdvisor";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FarmingHistory from "./pages/FarmingHistory";

import "./css/App.css";
import "./css/AIChat.css";
import "./css/Navbar.css";
import "./css/SearchForm.css";
import "./css/WeatherCard.css";
import "./css/ForecastCard.css";
import "./css/RecommendationCard.css";
import "./css/AlertCard.css";
import "./css/WeatherCharts.css";
import "./css/CropInfoCard.css";
import "./css/StatsCard.css";
import "./css/Loading.css";
import "./css/FarmProfile.css";
import "./css/FarmingHistory.css";
import "./css/FertilizerAdvisor.css";
import "./css/PestDiseaseAdvisor.css";
import "./css/Login.css";
import "./css/Register.css";


// ==========================================
// API BASE URL
// ==========================================

const API_URL = import.meta.env.VITE_API_URL;




// ==========================================
// HOME PAGE
// ==========================================

function Home({
    city,
    setCity,
    crop,
    setCrop,
    growthStage,
    setGrowthStage,
    soilType,
    setSoilType,
    farmingActivity,
    setFarmingActivity,
    getWeather,
    getLocationWeather,
    loading,
    weatherData,
    error
}) {

    return (
        <main>

            {/* ==========================================
                HERO SECTION
            ========================================== */}

            <section className="hero">

                <h1>
                    Smart Farming Advisor 🌾
                </h1>

                <p>
                    Make better farming decisions using
                    real-time weather intelligence.
                </p>

            </section>


            {/* ==========================================
                SEARCH FORM
            ========================================== */}

            <SearchForm
                city={city}
                setCity={setCity}

                crop={crop}
                setCrop={setCrop}

                growthStage={growthStage}
                setGrowthStage={setGrowthStage}

                soilType={soilType}
                setSoilType={setSoilType}

                farmingActivity={farmingActivity}
                setFarmingActivity={setFarmingActivity}

                getWeather={getWeather}
                getLocationWeather={getLocationWeather}

                loading={loading}
            />


            {/* ==========================================
                DASHBOARD SUMMARY
            ========================================== */}

            {!loading && weatherData && (

                <section className="dashboard-summary">

                    {/* Dashboard Header */}

                    <div className="dashboard-summary-header">

                        <div>

                            <span className="dashboard-eyebrow">
                                FARMING DASHBOARD
                            </span>

                            <h2>
                                Farming Conditions for{" "}
                                {weatherData?.weather?.city}
                            </h2>

                            <p>
                                A quick overview of your current
                                weather and crop conditions.
                            </p>

                        </div>


                        {/* Selected Crop */}

                        <div className="dashboard-crop-badge">

                            🌾{" "}
                            {weatherData?.crop?.name || crop}

                        </div>

                    </div>


                    {/* Dashboard Statistics */}

                    <div className="dashboard-summary-grid">


                        {/* Temperature */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                🌡️
                            </div>

                            <div>

                                <span>
                                    Temperature
                                </span>

                                <strong>
                                    {weatherData?.weather?.temperature}
                                    °C
                                </strong>

                            </div>

                        </div>


                        {/* Humidity */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                💧
                            </div>

                            <div>

                                <span>
                                    Humidity
                                </span>

                                <strong>
                                    {weatherData?.weather?.humidity}%
                                </strong>

                            </div>

                        </div>


                        {/* Wind Speed */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                💨
                            </div>

                            <div>

                                <span>
                                    Wind Speed
                                </span>

                                <strong>
                                    {weatherData?.weather?.windSpeed} m/s
                                </strong>

                            </div>

                        </div>


                        {/* Weather Condition */}

                        <div className="dashboard-stat">

                            <div className="dashboard-stat-icon">
                                ☁️
                            </div>

                            <div>

                                <span>
                                    Condition
                                </span>

                                <strong className="dashboard-condition">
                                    {weatherData?.weather?.condition}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>

            )}


            {/* ==========================================
                LOADING
            ========================================== */}

            {loading && <Loading />}


            {/* ==========================================
                WEATHER RESULTS
            ========================================== */}

            {!loading && weatherData && (

                <>

                    {/* CURRENT WEATHER */}

                    <WeatherCard
                        weather={weatherData?.weather}
                    />


                    {/* WEATHER STATISTICS */}

                    <StatsCard
                        weather={weatherData?.weather}
                        forecast={weatherData?.forecast}
                    />


                    {/* CROP INFORMATION */}

                    <CropInfoCard
                        crop={weatherData?.crop}
                    />


                    {/* WEATHER FORECAST */}

                    <ForecastCard
                        forecast={weatherData?.forecast}
                    />


                    {/* WEATHER CHARTS */}

                    <WeatherCharts
                        forecast={weatherData?.forecast}
                    />


                    {/* RECOMMENDATIONS */}

                    <RecommendationCard
                        recommendations={
                            weatherData?.recommendations
                        }
                    />


                    {/* ALERTS */}

                    <AlertCard
                        alerts={weatherData?.alerts}
                    />

                </>

            )}


            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {error && (

                <div className="error-message">

                    <span>
                        ⚠️
                    </span>

                    <p>
                        {error}
                    </p>

                </div>

            )}

        </main>
    );
}


// ==========================================
// MAIN APP
// ==========================================

function App() {

    // ==========================================
    // STATE
    // ==========================================

    const [city, setCity] = useState("");

    const [crop, setCrop] = useState("wheat");

    const [weatherData, setWeatherData] =
        useState(null);

    const [growthStage, setGrowthStage] =
        useState("vegetative");

    const [loading, setLoading] =
        useState(false);

    const [soilType, setSoilType] =
        useState("loamy");

    const [farmingActivity, setFarmingActivity] =
        useState("general");

    const [error, setError] =
        useState("");


    // ==========================================
    // AUTH CONFIG
    // ==========================================

    const getAuthConfig = () => {

        const token =
            localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };


    // ==========================================
    // LOAD SAVED FARM + WEATHER
    // ==========================================

    useEffect(() => {

        const loadFarmAndWeather = async () => {

            try {

                // ==========================================
                // CHECK LOGIN
                // ==========================================

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    return;
                }


                // ==========================================
                // GET SAVED FARM
                // ==========================================

                const farmResponse =
                    await axios.get(
                        `${API_URL}/api/farms`,
                        getAuthConfig()
                    );


                const farms =
                    farmResponse.data.data;


                // ==========================================
                // CHECK IF FARM EXISTS
                // ==========================================

                if (
                    !farms ||
                    farms.length === 0
                ) {
                    return;
                }


                // ==========================================
                // GET LATEST FARM
                // ==========================================

                const farm = farms[0];


                // ==========================================
                // GET FARM VALUES
                // ==========================================

                const savedCity =
                    farm.location || "";

                const savedCrop =
                    farm.crop?.toLowerCase() ||
                    "wheat";

                const savedSoil =
                    farm.soilType ||
                    "loamy";

                const savedGrowthStage =
                    farm.growthStage ||
                    "vegetative";

                const savedActivity =
                    farm.farmingActivity ||
                    "general";


                // ==========================================
                // UPDATE HOME FORM
                // ==========================================

                setCity(savedCity);

                setCrop(savedCrop);

                setSoilType(savedSoil);

                setGrowthStage(
                    savedGrowthStage
                );

                setFarmingActivity(
                    savedActivity
                );


                // ==========================================
                // AUTOMATICALLY FETCH WEATHER
                // ==========================================

                if (savedCity.trim()) {

                    setLoading(true);

                    setError("");


                    const weatherResponse =
                        await axios.get(
                            `${API_URL}/api/weather?city=${encodeURIComponent(
                                savedCity
                            )}&crop=${savedCrop}&growthStage=${savedGrowthStage}&soilType=${savedSoil}&farmingActivity=${savedActivity}`
                        );


                    // ==========================================
                    // SAVE WEATHER DATA
                    // ==========================================

                    setWeatherData(
                        weatherResponse.data.data
                    );

                }

            }

            catch (error) {

                console.error(
                    "Unable to load farm dashboard:",
                    error
                );


                // ==========================================
                // AUTH ERROR
                // ==========================================

                if (
                    error.response?.status === 401
                ) {

                    setError(
                        "Your login session is invalid or expired. Please login again."
                    );

                }

                else {

                    setError(
                        "Unable to load saved farm weather."
                    );

                }

            }

            finally {

                setLoading(false);

            }

        };


        loadFarmAndWeather();

    }, []);


    // ==========================================
    // GET WEATHER BY CITY
    // ==========================================

    const getWeather = async () => {

        // ==========================================
        // VALIDATE CITY
        // ==========================================

        if (!city.trim()) {

            setError(
                "Please enter a city name."
            );

            setWeatherData(null);

            return;
        }


        try {

            setLoading(true);

            setError("");


            // ==========================================
            // API REQUEST
            // ==========================================

            const response =
                await axios.get(
                    `${API_URL}/api/weather?city=${encodeURIComponent(
                        city
                    )}&crop=${crop}&growthStage=${growthStage}&soilType=${soilType}&farmingActivity=${farmingActivity}`
                );


            // ==========================================
            // SAVE API DATA
            // ==========================================

            setWeatherData(
                response.data.data
            );

        }


        catch (error) {

            console.error(error);

            setWeatherData(null);


            // ==========================================
            // SERVER RESPONDED WITH ERROR
            // ==========================================

            if (error.response) {

                if (
                    error.response.status === 404
                ) {

                    setError(
                        "City or selected crop was not found. Please check your selection."
                    );

                }

                else if (
                    error.response.status === 400
                ) {

                    setError(
                        "Please provide a valid city and crop."
                    );

                }

                else if (
                    error.response.status === 500
                ) {

                    setError(
                        "Weather service is currently unavailable. Please try again later."
                    );

                }

                else {

                    setError(
                        "Unable to fetch weather data. Please try again."
                    );

                }

            }


            // ==========================================
            // REQUEST MADE BUT NO RESPONSE
            // ==========================================

            else if (error.request) {

                setError(
                    "Unable to connect to the server. Please make sure the backend is running."
                );

            }


            // ==========================================
            // OTHER ERROR
            // ==========================================

            else {

                setError(
                    "Something went wrong. Please try again."
                );

            }

        }


        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // GET WEATHER BY LOCATION
    // ==========================================

    const getLocationWeather = () => {

        // ==========================================
        // CHECK BROWSER SUPPORT
        // ==========================================

        if (!navigator.geolocation) {

            setError(
                "Geolocation is not supported by your browser."
            );

            return;
        }


        setLoading(true);

        setError("");


        // ==========================================
        // GET CURRENT LOCATION
        // ==========================================

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    // ==========================================
                    // API REQUEST
                    // ==========================================

                    const response =
                        await axios.get(
                            `${API_URL}/api/weather?lat=${latitude}&lon=${longitude}&crop=${crop}&growthStage=${growthStage}&soilType=${soilType}&farmingActivity=${farmingActivity}`
                        );


                    // ==========================================
                    // SAVE WEATHER DATA
                    // ==========================================

                    setWeatherData(
                        response.data.data
                    );


                    // ==========================================
                    // UPDATE CITY NAME
                    // ==========================================

                    setCity(
                        response.data.data.weather.city
                    );

                }


                catch (error) {

                    console.error(error);

                    setError(
                        "Unable to fetch weather for your location."
                    );

                    setWeatherData(null);

                }


                finally {

                    setLoading(false);

                }

            },


            // ==========================================
            // LOCATION ERROR
            // ==========================================

            (error) => {

                console.error(error);

                setLoading(false);


                if (error.code === 1) {

                    setError(
                        "Location permission was denied. Please allow location access."
                    );

                }

                else {

                    setError(
                        "Unable to detect your location."
                    );

                }

            }

        );

    };


    // ==========================================
    // ROUTES
    // ==========================================

    return (

        <BrowserRouter>

            {/* ==========================================
                NAVBAR
            ========================================== */}

            <Navbar />


            <Routes>

                {/* ==========================================
                    HOME
                ========================================== */}

                <Route
                    path="/"
                    element={

                        <Home

                            city={city}
                            setCity={setCity}

                            crop={crop}
                            setCrop={setCrop}

                            growthStage={growthStage}
                            setGrowthStage={
                                setGrowthStage
                            }

                            soilType={soilType}
                            setSoilType={
                                setSoilType
                            }

                            farmingActivity={
                                farmingActivity
                            }

                            setFarmingActivity={
                                setFarmingActivity
                            }

                            getWeather={
                                getWeather
                            }

                            getLocationWeather={
                                getLocationWeather
                            }

                            loading={loading}

                            weatherData={
                                weatherData
                            }

                            error={error}

                        />

                    }
                />


                {/* ==========================================
                    FERTILIZER ADVISOR
                ========================================== */}

                <Route
                    path="/fertilizer-advisor"
                    element={
                        <FertilizerAdvisor />
                    }
                />


                {/* ==========================================
                    PEST & DISEASE ADVISOR
                ========================================== */}

                <Route
                    path="/pest-disease-advisor"
                    element={
                        <PestDiseaseAdvisor />
                    }
                />


                {/* ==========================================
                    FARM PROFILE
                ========================================== */}

                <Route
                    path="/farm-profile"
                    element={
                        <FarmProfile />
                    }
                />


                {/* ==========================================
                    REGISTER
                ========================================== */}

                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />


                {/* ==========================================
                    LOGIN
                ========================================== */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* ==========================================
                    FARMING HISTORY
                ========================================== */}

                <Route
                    path="/farming-history"
                    element={
                        <FarmingHistory />
                    }
                />

            </Routes>


            {/* ==========================================
                AI CHAT
            ========================================== */}

            <AIChat />

        </BrowserRouter>

    );

}


// ==========================================
// EXPORT APP
// ==========================================

export default App;