import { useEffect, useState } from "react";
import axios from "axios";

function FarmProfile() {
    const [formData, setFormData] = useState({
        farmerName: "",
        location: "",
        crop: "Wheat",
        soilType: "loamy",
        farmSize: "",
        growthStage: "vegetative",
        farmingActivity: "general"
    });

    const [user, setUser] = useState(null);
    const [farmId, setFarmId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ==========================================
    // GET AUTH CONFIG
    // ==========================================

    const getAuthConfig = () => {
        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    // ==========================================
    // LOAD USER + FARM
    // ==========================================

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login to access your farm profile.");
                    return;
                }

                // Load logged-in user
                const storedUser = localStorage.getItem("user");

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }

                // Load user's farm
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/farms`,
                    getAuthConfig()
                );

                const farms = response.data.data;

                if (farms && farms.length > 0) {
                    const farm = farms[0];

                    setFarmId(farm._id);

                    setFormData({
                        farmerName: farm.farmerName || "",
                        location: farm.location || "",
                        crop: farm.crop || "Wheat",
                        soilType: farm.soilType || "loamy",
                        farmSize: farm.farmSize ?? "",
                        growthStage:
                            farm.growthStage || "vegetative",
                        farmingActivity:
                            farm.farmingActivity || "general"
                    });
                }
            } catch (error) {
                console.error("Error loading farm profile:", error);

                if (error.response?.status === 401) {
                    setError(
                        "Your login session is invalid or expired. Please login again."
                    );
                } else {
                    setError(
                        error.response?.data?.message ||
                        "Unable to load your farm profile."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setMessage("");
        setError("");
    };

    // ==========================================
    // SAVE / UPDATE FARM
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login before saving your farm.");
                setSaving(false);
                return;
            }

            const data = {
                ...formData,
                farmSize: Number(formData.farmSize)
            };

            // UPDATE
            if (farmId) {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/farms/${farmId}`,
                    data,
                    getAuthConfig()
                );

                setMessage(
                    response.data.message ||
                    "Farm profile updated successfully! 🌾"
                );
            }

            // CREATE
            else {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/farming-history`,
                    setFarmId(response.data.data._id));

                setMessage(
                    response.data.message ||
                    "Farm profile saved successfully! 🌾"
                );
            }
        } catch (error) {
            console.error("Error saving farm:", error);

            if (error.response?.status === 401) {
                setError(
                    "Your login session is invalid or expired. Please login again."
                );
            } else {
                setError(
                    error.response?.data?.message ||
                    "Failed to save farm profile."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <main className="farm-profile-page">
                <section className="farm-profile-loading-card">
                    <div className="farm-profile-loading-icon">
                        🌾
                    </div>

                    <h2>Loading Your Farm Profile</h2>

                    <p>
                        Fetching your saved farm information...
                    </p>
                </section>
            </main>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <main className="farm-profile-page">

            {/* ==========================================
                HERO
            ========================================== */}

            <section className="farm-profile-hero">

                <div className="farm-profile-hero-icon">
                    👨‍🌾
                </div>

                <div>
                    <p className="farm-profile-eyebrow">
                        PERSONALIZED FARM PROFILE
                    </p>

                    <h1>
                        Welcome,{" "}
                        {user?.name || formData.farmerName || "Farmer"} 🌾
                    </h1>

                    <p>
                        Manage your farm information and receive
                        personalized agricultural recommendations.
                    </p>
                </div>

            </section>


            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (
                <div className="farm-error-message">
                    ❌ {error}
                </div>
            )}


            {/* ==========================================
                FARM SUMMARY
            ========================================== */}

            {farmId && (
                <section className="farm-summary-section">

                    <div className="farm-summary-header">
                        <div>
                            <p className="farm-summary-eyebrow">
                                FARM OVERVIEW
                            </p>

                            <h2>
                                Your Farm at a Glance
                            </h2>

                            <p>
                                Your saved farm information is used
                                to personalize weather and farming advice.
                            </p>
                        </div>

                        <div className="farm-summary-badge">
                            🌱 Profile Active
                        </div>
                    </div>


                    <div className="farm-summary-grid">

                        {/* FARMER */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                👨‍🌾
                            </div>

                            <div>
                                <span>Farmer</span>
                                <strong>
                                    {formData.farmerName || "Not set"}
                                </strong>
                            </div>

                        </div>


                        {/* LOCATION */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                📍
                            </div>

                            <div>
                                <span>Location</span>
                                <strong>
                                    {formData.location || "Not set"}
                                </strong>
                            </div>

                        </div>


                        {/* CROP */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                🌾
                            </div>

                            <div>
                                <span>Current Crop</span>
                                <strong>
                                    {formData.crop}
                                </strong>
                            </div>

                        </div>


                        {/* FARM SIZE */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                📐
                            </div>

                            <div>
                                <span>Farm Size</span>
                                <strong>
                                    {formData.farmSize
                                        ? `${formData.farmSize} acres`
                                        : "Not set"}
                                </strong>
                            </div>

                        </div>


                        {/* SOIL */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                🌍
                            </div>

                            <div>
                                <span>Soil Type</span>
                                <strong className="capitalize-text">
                                    {formData.soilType}
                                </strong>
                            </div>

                        </div>


                        {/* GROWTH STAGE */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                🌱
                            </div>

                            <div>
                                <span>Growth Stage</span>
                                <strong className="capitalize-text">
                                    {formData.growthStage}
                                </strong>
                            </div>

                        </div>


                        {/* ACTIVITY */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                🚜
                            </div>

                            <div>
                                <span>Farming Activity</span>
                                <strong className="capitalize-text">
                                    {formData.farmingActivity}
                                </strong>
                            </div>

                        </div>


                        {/* ACCOUNT */}

                        <div className="farm-summary-card">

                            <div className="farm-summary-icon">
                                📧
                            </div>

                            <div>
                                <span>Account</span>
                                <strong>
                                    {user?.email || "Logged in"}
                                </strong>
                            </div>

                        </div>

                    </div>

                </section>
            )}


            {/* ==========================================
                PROFILE FORM
            ========================================== */}

            <section className="farm-profile-card">

                <div className="farm-profile-card-header">

                    <div>
                        <p className="farm-profile-card-eyebrow">
                            FARM INFORMATION
                        </p>

                        <h2>
                            {farmId
                                ? "Update Farm Details"
                                : "Create Your Farm Profile"}
                        </h2>

                        <p>
                            Keep your farm information updated so the
                            advisory system can provide relevant recommendations.
                        </p>
                    </div>

                    <div className="farm-profile-card-icon">
                        ⚙️
                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="farm-profile-grid">

                        {/* FARMER NAME */}

                        <div className="farm-form-group">

                            <label>
                                Farmer Name
                            </label>

                            <input
                                type="text"
                                name="farmerName"
                                value={formData.farmerName}
                                onChange={handleChange}
                                placeholder="Enter farmer name"
                                required
                            />

                        </div>


                        {/* LOCATION */}

                        <div className="farm-form-group">

                            <label>
                                Farm Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter village/city"
                                required
                            />

                        </div>


                        {/* CROP */}

                        <div className="farm-form-group">

                            <label>
                                Current Crop
                            </label>

                            <select
                                name="crop"
                                value={formData.crop}
                                onChange={handleChange}
                            >
                                <option value="Wheat">Wheat</option>
                                <option value="Rice">Rice</option>
                                <option value="Maize">Maize</option>
                                <option value="Potato">Potato</option>
                                <option value="Tomato">Tomato</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Mustard">Mustard</option>
                                <option value="Sugarcane">
                                    Sugarcane
                                </option>
                            </select>

                        </div>


                        {/* SOIL */}

                        <div className="farm-form-group">

                            <label>
                                Soil Type
                            </label>

                            <select
                                name="soilType"
                                value={formData.soilType}
                                onChange={handleChange}
                            >
                                <option value="loamy">
                                    Loamy
                                </option>

                                <option value="sandy">
                                    Sandy
                                </option>

                                <option value="clayey">
                                    Clayey
                                </option>

                                <option value="silty">
                                    Silty
                                </option>

                                <option value="black">
                                    Black Soil
                                </option>

                                <option value="red">
                                    Red Soil
                                </option>
                            </select>

                        </div>


                        {/* FARM SIZE */}

                        <div className="farm-form-group">

                            <label>
                                Farm Size (acres)
                            </label>

                            <input
                                type="number"
                                name="farmSize"
                                value={formData.farmSize}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                min="0"
                                step="0.1"
                                required
                            />

                        </div>


                        {/* GROWTH STAGE */}

                        <div className="farm-form-group">

                            <label>
                                Crop Growth Stage
                            </label>

                            <select
                                name="growthStage"
                                value={formData.growthStage}
                                onChange={handleChange}
                            >
                                <option value="seedling">
                                    Seedling
                                </option>

                                <option value="vegetative">
                                    Vegetative
                                </option>

                                <option value="flowering">
                                    Flowering
                                </option>

                                <option value="fruiting">
                                    Fruiting
                                </option>

                                <option value="maturity">
                                    Maturity
                                </option>

                                <option value="harvesting">
                                    Harvesting
                                </option>
                            </select>

                        </div>


                        {/* FARMING ACTIVITY */}

                        <div className="farm-form-group farm-form-full">

                            <label>
                                Current Farming Activity
                            </label>

                            <select
                                name="farmingActivity"
                                value={formData.farmingActivity}
                                onChange={handleChange}
                            >
                                <option value="general">
                                    General Farming
                                </option>

                                <option value="irrigation">
                                    Irrigation
                                </option>

                                <option value="sowing">
                                    Sowing
                                </option>

                                <option value="fertilization">
                                    Fertilization
                                </option>

                                <option value="spraying">
                                    Spraying
                                </option>

                                <option value="harvesting">
                                    Harvesting
                                </option>
                            </select>

                        </div>

                    </div>


                    {/* SUCCESS */}

                    {message && (
                        <div className="farm-success-message">
                            ✅ {message}
                        </div>
                    )}


                    {/* SAVE BUTTON */}

                    <button
                        type="submit"
                        className="farm-save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : farmId
                                ? "✏️ Update Farm Profile"
                                : "💾 Create Farm Profile"}
                    </button>

                </form>

            </section>


            {/* ==========================================
                PERSONALIZATION INFO
            ========================================== */}

            <section className="farm-personalization-section">

                <div className="farm-personalization-icon">
                    🤖
                </div>

                <div>
                    <h3>
                        How your profile improves recommendations
                    </h3>

                    <p>
                        Your crop, soil type, growth stage, location,
                        and farming activity are used by the advisory
                        system to provide more relevant weather-based
                        farming recommendations.
                    </p>
                </div>

            </section>

        </main>
    );
}

export default FarmProfile;