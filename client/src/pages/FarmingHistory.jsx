import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function FarmingHistory() {
    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [filterCrop, setFilterCrop] = useState("All");
    const [filterActivity, setFilterActivity] = useState("All");

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split("T")[0],
        crop: "Wheat",
        activity: "Irrigation",
        growthStage: "vegetative",
        location: "",
        notes: ""
    });

    const cropOptions = [
        "Wheat",
        "Rice",
        "Maize",
        "Potato",
        "Tomato",
        "Cotton",
        "Mustard",
        "Sugarcane"
    ];

    const activityOptions = [
        "Irrigation",
        "Sowing",
        "Planting",
        "Fertilization",
        "Spraying",
        "Weeding",
        "Harvesting",
        "Other"
    ];

    const growthStageOptions = [
        {
            value: "sowing",
            label: "Sowing"
        },
        {
            value: "vegetative",
            label: "Vegetative"
        },
        {
            value: "flowering",
            label: "Flowering"
        },
        {
            value: "maturity",
            label: "Maturity"
        },
        {
            value: "harvesting",
            label: "Harvesting"
        }
    ];

    const getAuthConfig = () => {
        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    // ==========================================
    // LOAD FARMING HISTORY
    // ==========================================

    const loadHistory = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login to view your farming history.");
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/farming-history`,
                getAuthConfig()
            );

            setHistory(response.data.data || []);
        } catch (error) {
            console.error(
                "Error loading farming history:",
                error
            );

            if (error.response?.status === 401) {
                setError(
                    "Your login session is invalid or expired. Please login again."
                );
            } else {
                setError(
                    error.response?.data?.message ||
                    "Unable to load farming history."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOAD FARM PROFILE
    // ==========================================

    const loadFarmProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/farms`,
    getAuthConfig()
);

            const farms = response.data.data || [];

            if (farms.length > 0) {
                const farm = farms[0];

                setFormData((previous) => ({
                    ...previous,
                    crop: farm.crop || previous.crop,
                    location: farm.location || previous.location,
                    growthStage:
                        farm.growthStage ||
                        previous.growthStage
                }));
            }
        } catch (error) {
            console.error(
                "Error loading farm profile:",
                error
            );
        }
    };

    useEffect(() => {
        loadHistory();
        loadFarmProfile();
    }, []);

    // ==========================================
    // HANDLE FORM INPUT
    // ==========================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // ==========================================
    // ADD FARMING ACTIVITY
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setMessage("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login before recording an activity.");
                return;
            }

            if (
                !formData.date ||
                !formData.crop ||
                !formData.activity ||
                !formData.growthStage
            ) {
                setError(
                    "Please fill all required fields."
                );
                return;
            }

           const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/farming-history`,
                {
                    date: formData.date,
                    crop: formData.crop,
                    activity: formData.activity,
                    growthStage: formData.growthStage,
                    location: formData.location,
                    notes: formData.notes
                },
                getAuthConfig()
            );

            const newHistory = response.data.data;

            setHistory((previousHistory) => [
                newHistory,
                ...previousHistory
            ]);

            setMessage(
                "Farming activity recorded successfully."
            );

            setFormData((previous) => ({
                ...previous,
                date: new Date()
                    .toISOString()
                    .split("T")[0],
                activity: "Irrigation",
                notes: ""
            }));

            setShowForm(false);
        } catch (error) {
            console.error(
                "Error saving farming activity:",
                error
            );

            if (error.response?.status === 401) {
                setError(
                    "Your login session is invalid or expired. Please login again."
                );
            } else {
                setError(
                    error.response?.data?.message ||
                    "Unable to save farming activity."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // DELETE FARMING ACTIVITY
    // ==========================================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this farming activity?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);
            setError("");
            setMessage("");

           const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/farming-history`,
    getAuthConfig()
);

            setHistory((previousHistory) =>
                previousHistory.filter(
                    (item) => item._id !== id
                )
            );

            setMessage(
                "Farming activity deleted successfully."
            );
        } catch (error) {
            console.error(
                "Error deleting farming activity:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to delete farming activity."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // ==========================================
    // FILTER OPTIONS
    // ==========================================

    const historyCropOptions = useMemo(() => {
        return [
            "All",
            ...new Set(
                history
                    .map((item) => item.crop)
                    .filter(Boolean)
            )
        ];
    }, [history]);

    const historyActivityOptions = useMemo(() => {
        return [
            "All",
            ...new Set(
                history
                    .map((item) => item.activity)
                    .filter(Boolean)
            )
        ];
    }, [history]);

    // ==========================================
    // FILTER HISTORY
    // ==========================================

    const filteredHistory = useMemo(() => {
        return history.filter((item) => {
            const cropMatch =
                filterCrop === "All" ||
                item.crop === filterCrop;

            const activityMatch =
                filterActivity === "All" ||
                item.activity === filterActivity;

            return cropMatch && activityMatch;
        });
    }, [
        history,
        filterCrop,
        filterActivity
    ]);

    // ==========================================
    // DATE FORMAT
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "Date not available";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };

    // ==========================================
    // ACTIVITY ICON
    // ==========================================

    const getActivityIcon = (activity) => {
        const value =
            activity?.toLowerCase() || "";

        if (value.includes("irrigation")) {
            return "💧";
        }

        if (value.includes("fertiliz")) {
            return "🧪";
        }

        if (
            value.includes("sowing") ||
            value.includes("plant")
        ) {
            return "🌱";
        }

        if (value.includes("spraying")) {
            return "🛡️";
        }

        if (value.includes("harvest")) {
            return "🌾";
        }

        if (value.includes("weed")) {
            return "🌿";
        }

        return "🚜";
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <main className="history-page">

                <section className="history-loading">

                    <div className="history-loading-icon">
                        📋
                    </div>

                    <h2>
                        Loading Farming History...
                    </h2>

                    <p>
                        Fetching your farming activities.
                    </p>

                </section>

            </main>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <main className="history-page">

            {/* ==========================================
                HERO
            ========================================== */}

            <section className="history-hero">

                <div className="history-hero-icon">
                    📋
                </div>

                <div>

                    <p className="history-eyebrow">
                        FARMING RECORDS
                    </p>

                    <h1>
                        Farming History
                    </h1>

                    <p>
                        Keep track of your farming activities,
                        crop stages and field operations.
                    </p>

                </div>

            </section>

            {/* ==========================================
                MESSAGES
            ========================================== */}

            {error && (
                <div className="history-error">
                    ❌ {error}
                </div>
            )}

            {message && (
                <div className="history-success">
                    ✅ {message}
                </div>
            )}

            {/* ==========================================
                ADD ACTIVITY BUTTON
            ========================================== */}

            <section className="history-action-section">

                <div>

                    <p className="history-list-eyebrow">
                        FARM ACTIVITY
                    </p>

                    <h2>
                        Record a New Activity
                    </h2>

                    <p>
                        Add irrigation, sowing, fertilization,
                        spraying or other field operations.
                    </p>

                </div>

                <button
                    type="button"
                    className="history-add-button"
                    onClick={() => {
                        setShowForm((previous) => !previous);
                        setError("");
                        setMessage("");
                    }}
                >
                    {showForm
                        ? "✖ Close Form"
                        : "➕ Add Activity"}
                </button>

            </section>

            {/* ==========================================
                ADD ACTIVITY FORM
            ========================================== */}

            {showForm && (
                <section className="history-form-card">

                    <div className="history-form-header">

                        <div className="history-form-icon">
                            🚜
                        </div>

                        <div>

                            <p className="history-list-eyebrow">
                                NEW RECORD
                            </p>

                            <h2>
                                Add Farming Activity
                            </h2>

                            <p>
                                Record what you have done on
                                your farm.
                            </p>

                        </div>

                    </div>

                    <form
                        className="history-form"
                        onSubmit={handleSubmit}
                    >

                        {/* DATE */}

                        <div className="history-form-group">

                            <label htmlFor="date">
                                Date
                            </label>

                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        {/* CROP */}

                        <div className="history-form-group">

                            <label htmlFor="crop">
                                Crop
                            </label>

                            <select
                                id="crop"
                                name="crop"
                                value={formData.crop}
                                onChange={handleChange}
                                required
                            >

                                {cropOptions.map((crop) => (
                                    <option
                                        key={crop}
                                        value={crop}
                                    >
                                        {crop}
                                    </option>
                                ))}

                            </select>

                        </div>

                        {/* ACTIVITY */}

                        <div className="history-form-group">

                            <label htmlFor="activity">
                                Activity
                            </label>

                            <select
                                id="activity"
                                name="activity"
                                value={formData.activity}
                                onChange={handleChange}
                                required
                            >

                                {activityOptions.map(
                                    (activity) => (
                                        <option
                                            key={activity}
                                            value={activity}
                                        >
                                            {activity}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* GROWTH STAGE */}

                        <div className="history-form-group">

                            <label htmlFor="growthStage">
                                Growth Stage
                            </label>

                            <select
                                id="growthStage"
                                name="growthStage"
                                value={formData.growthStage}
                                onChange={handleChange}
                                required
                            >

                                {growthStageOptions.map(
                                    (stage) => (
                                        <option
                                            key={stage.value}
                                            value={stage.value}
                                        >
                                            {stage.label}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* LOCATION */}

                        <div className="history-form-group">

                            <label htmlFor="location">
                                Location
                            </label>

                            <input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="e.g. Ludhiana"
                                value={formData.location}
                                onChange={handleChange}
                            />

                        </div>

                        {/* NOTES */}

                        <div className="history-form-group history-form-full">

                            <label htmlFor="notes">
                                Notes
                            </label>

                            <textarea
                                id="notes"
                                name="notes"
                                rows="4"
                                placeholder="Add details about this activity..."
                                value={formData.notes}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        {/* BUTTONS */}

                        <div className="history-form-actions">

                            <button
                                type="button"
                                className="history-cancel-button"
                                onClick={() => {
                                    setShowForm(false);
                                    setError("");
                                }}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="history-save-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "💾 Save Activity"}
                            </button>

                        </div>

                    </form>

                </section>
            )}

            {/* ==========================================
                STATISTICS
            ========================================== */}

            <section className="history-stats">

                <div className="history-stat-card">

                    <div className="history-stat-icon">
                        📋
                    </div>

                    <div>

                        <span>
                            Total Activities
                        </span>

                        <strong>
                            {history.length}
                        </strong>

                    </div>

                </div>

                <div className="history-stat-card">

                    <div className="history-stat-icon">
                        🌾
                    </div>

                    <div>

                        <span>
                            Crops Recorded
                        </span>

                        <strong>
                            {
                                new Set(
                                    history
                                        .map(
                                            (item) =>
                                                item.crop
                                        )
                                        .filter(Boolean)
                                ).size
                            }
                        </strong>

                    </div>

                </div>

                <div className="history-stat-card">

                    <div className="history-stat-icon">
                        🚜
                    </div>

                    <div>

                        <span>
                            Activity Types
                        </span>

                        <strong>
                            {
                                new Set(
                                    history
                                        .map(
                                            (item) =>
                                                item.activity
                                        )
                                        .filter(Boolean)
                                ).size
                            }
                        </strong>

                    </div>

                </div>

            </section>

            {/* ==========================================
                FILTERS
            ========================================== */}

            {history.length > 0 && (
                <section className="history-filter-card">

                    <div className="history-filter-header">

                        <div>

                            <h2>
                                Filter Records
                            </h2>

                            <p>
                                Find specific farming activities
                                from your history.
                            </p>

                        </div>

                        <span>
                            {filteredHistory.length} records
                        </span>

                    </div>

                    <div className="history-filter-grid">

                        <div className="history-form-group">

                            <label>
                                Crop
                            </label>

                            <select
                                value={filterCrop}
                                onChange={(event) =>
                                    setFilterCrop(
                                        event.target.value
                                    )
                                }
                            >

                                {historyCropOptions.map(
                                    (crop) => (
                                        <option
                                            key={crop}
                                            value={crop}
                                        >
                                            {crop}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        <div className="history-form-group">

                            <label>
                                Activity
                            </label>

                            <select
                                value={filterActivity}
                                onChange={(event) =>
                                    setFilterActivity(
                                        event.target.value
                                    )
                                }
                            >

                                {historyActivityOptions.map(
                                    (activity) => (
                                        <option
                                            key={activity}
                                            value={activity}
                                        >
                                            {activity}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                    </div>

                </section>
            )}

            {/* ==========================================
                EMPTY STATE
            ========================================== */}

            {history.length === 0 && (
                <section className="history-empty">

                    <div className="history-empty-icon">
                        🌱
                    </div>

                    <h2>
                        No Farming Activities Yet
                    </h2>

                    <p>
                        Click "Add Activity" above to record
                        your first farming operation.
                    </p>

                </section>
            )}

            {/* ==========================================
                HISTORY TIMELINE
            ========================================== */}

            {filteredHistory.length > 0 && (

                <section className="history-list-section">

                    <div className="history-list-header">

                        <div>

                            <p className="history-list-eyebrow">
                                ACTIVITY TIMELINE
                            </p>

                            <h2>
                                Your Farming Records
                            </h2>

                        </div>

                        <span>
                            {filteredHistory.length} Records
                        </span>

                    </div>

                    <div className="history-timeline">

                        {filteredHistory.map((item) => (

                            <article
                                className="history-item"
                                key={item._id}
                            >

                                <div className="history-timeline-line"></div>

                                <div className="history-item-icon">

                                    {getActivityIcon(
                                        item.activity
                                    )}

                                </div>

                                <div className="history-item-content">

                                    <div className="history-item-top">

                                        <div>

                                            <span className="history-date">

                                                📅{" "}
                                                {formatDate(
                                                    item.date
                                                )}

                                            </span>

                                            <h3>
                                                {item.activity}
                                            </h3>

                                        </div>

                                        <button
                                            type="button"
                                            className="history-delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    item._id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                item._id
                                            }
                                        >
                                            {deletingId ===
                                                item._id
                                                ? "Deleting..."
                                                : "🗑️ Delete"}
                                        </button>

                                    </div>

                                    <div className="history-tags">

                                        <span>
                                            🌾{" "}
                                            {item.crop}
                                        </span>

                                        <span>
                                            🌱{" "}
                                            {item.growthStage}
                                        </span>

                                        {item.location && (
                                            <span>
                                                📍{" "}
                                                {item.location}
                                            </span>
                                        )}

                                    </div>

                                    {item.notes && (
                                        <div className="history-notes">

                                            <strong>
                                                Notes
                                            </strong>

                                            <p>
                                                {item.notes}
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </article>

                        ))}

                    </div>

                </section>

            )}

        </main>
    );
}

export default FarmingHistory;