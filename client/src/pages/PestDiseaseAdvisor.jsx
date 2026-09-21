import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function PestDiseaseAdvisor() {
    const [data, setData] = useState([]);
    const [crop, setCrop] = useState("Wheat");
    const [type, setType] = useState("All");
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const crops = [
        "Wheat",
        "Rice",
        "Maize",
        "Potato",
        "Tomato",
        "Cotton",
        "Mustard",
        "Sugarcane"
    ];

    /* =========================================
       FETCH PEST & DISEASE DATA
    ========================================= */

    useEffect(() => {
        const fetchPestDiseases = async () => {
            try {
                setLoading(true);
                setError("");
                setSelectedProblem(null);

                const response = await axios.get(
                    `http://localhost:5000/api/pest-diseases?crop=${crop}`
                );

                setData(response.data.data || []);
            } catch (error) {
                console.error(error);

                setError(
                    "Unable to fetch pest and disease information."
                );

                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPestDiseases();
    }, [crop]);

    /* =========================================
       FILTER DATA BY TYPE
    ========================================= */

    const filteredData = useMemo(() => {
        if (type === "All") {
            return data;
        }

        return data.filter(
            (item) => item.type === type
        );
    }, [data, type]);

    /* =========================================
       HELPERS
    ========================================= */

    const getIcon = (item) => {
        return item.type === "Pest" ? "🐛" : "🦠";
    };

    const getSeverityClass = (severity) => {
        if (severity === "High") {
            return "severity-high";
        }

        if (severity === "Medium") {
            return "severity-medium";
        }

        return "severity-low";
    };

    const handleCropChange = (e) => {
        setCrop(e.target.value);
        setSelectedProblem(null);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setSelectedProblem(null);
    };

    const handleViewDetails = (item) => {
        setSelectedProblem(item);

        setTimeout(() => {
            document
                .getElementById("pest-details")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 100);
    };

    return (
        <main className="pest-page">

            {/* =========================================
                HERO
            ========================================= */}

            <section className="pest-hero">
                <div className="pest-hero-icon">
                    🌿
                </div>

                <h1>
                    Pest & Disease Advisor
                </h1>

                <p>
                    Identify common crop pests and diseases,
                    understand their symptoms and get practical
                    prevention and management guidance.
                </p>
            </section>


            {/* =========================================
                FILTER CARD
            ========================================= */}

            <section className="pest-filter-card">

                <div className="pest-filter-header">
                    <div>
                        <span className="section-label">
                            CROP PROTECTION
                        </span>

                        <h2>
                            Find Crop Problems
                        </h2>

                        <p>
                            Select your crop and problem type to
                            explore common agricultural threats.
                        </p>
                    </div>

                    <div className="pest-filter-icon">
                        🔍
                    </div>
                </div>


                <div className="pest-filter-grid">

                    {/* CROP */}

                    <div className="pest-form-group">
                        <label>
                            🌱 Crop
                        </label>

                        <select
                            value={crop}
                            onChange={handleCropChange}
                        >
                            {crops.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* TYPE */}

                    <div className="pest-form-group">
                        <label>
                            🧪 Problem Type
                        </label>

                        <select
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <option value="All">
                                All Problems
                            </option>

                            <option value="Pest">
                                Pests
                            </option>

                            <option value="Disease">
                                Diseases
                            </option>
                        </select>
                    </div>

                </div>

            </section>


            {/* =========================================
                ERROR
            ========================================= */}

            {error && (
                <div className="pest-error">
                    <span>⚠️</span>

                    <div>
                        <strong>
                            Unable to load data
                        </strong>

                        <p>
                            {error}
                        </p>
                    </div>
                </div>
            )}


            {/* =========================================
                LOADING
            ========================================= */}

            {loading && (
                <div className="pest-placeholder">

                    <div className="pest-loading-icon">
                        🌱
                    </div>

                    <h3>
                        Loading Crop Protection Data...
                    </h3>

                    <p>
                        Fetching pest and disease information
                        for {crop}.
                    </p>

                </div>
            )}


            {/* =========================================
                RESULTS
            ========================================= */}

            {!loading && !error && filteredData.length > 0 && (
                <section className="pest-results">

                    <div className="pest-results-header">

                        <div>
                            <span className="section-label">
                                ADVISORY DATABASE
                            </span>

                            <h2>
                                Common Problems in {crop}
                            </h2>

                            <p>
                                Explore the common pests and diseases
                                affecting {crop}.
                            </p>
                        </div>

                        <div className="pest-count">
                            <strong>
                                {filteredData.length}
                            </strong>

                            <span>
                                {filteredData.length === 1
                                    ? " Problem"
                                    : " Problems"}
                            </span>
                        </div>

                    </div>


                    {/* =====================================
                        CARDS
                    ===================================== */}

                    <div className="pest-grid">

                        {filteredData.map((item) => (
                            <article
                                className="pest-card"
                                key={item._id}
                            >

                                {/* CARD TOP */}

                                <div className="pest-card-top">

                                    <div className="pest-card-icon">
                                        {getIcon(item)}
                                    </div>

                                    <span
                                        className={
                                            item.type === "Pest"
                                                ? "pest-type pest-type-pest"
                                                : "pest-type pest-type-disease"
                                        }
                                    >
                                        {item.type}
                                    </span>

                                </div>


                                {/* NAME */}

                                <h3>
                                    {item.name}
                                </h3>


                                {/* SHORT DESCRIPTION */}

                                <p className="pest-card-description">
                                    {item.symptoms?.length > 0
                                        ? item.symptoms[0]
                                        : "Information available for this crop problem."}
                                </p>


                                {/* SEVERITY */}

                                <div className="pest-card-meta">

                                    <span className="meta-label">
                                        Severity
                                    </span>

                                    <span
                                        className={`severity-badge ${getSeverityClass(
                                            item.severity
                                        )}`}
                                    >
                                        {item.severity || "Medium"}
                                    </span>

                                </div>


                                {/* SYMPTOMS COUNT */}

                                <div className="pest-card-info">

                                    <span>
                                        🔍{" "}
                                        {item.symptoms?.length || 0} Symptoms
                                    </span>

                                    <span>
                                        🛡️{" "}
                                        {item.prevention?.length || 0} Prevention Tips
                                    </span>

                                </div>


                                {/* BUTTON */}

                                <button
                                    className="pest-details-button"
                                    onClick={() =>
                                        handleViewDetails(item)
                                    }
                                >
                                    View Details
                                    <span>→</span>
                                </button>

                            </article>
                        ))}

                    </div>

                </section>
            )}


            {/* =========================================
                NO RESULTS
            ========================================= */}

            {!loading &&
                !error &&
                filteredData.length === 0 && (
                    <div className="pest-placeholder">

                        <div className="pest-loading-icon">
                            🔍
                        </div>

                        <h3>
                            No Information Found
                        </h3>

                        <p>
                            No matching pest or disease information
                            is available for {crop}.
                        </p>

                    </div>
                )}


            {/* =========================================
                DETAILS
            ========================================= */}

            {selectedProblem && (
                <section
                    className="pest-detail-section"
                    id="pest-details"
                >

                    <div className="pest-detail-card">

                        {/* DETAIL HEADER */}

                        <div className="pest-detail-header">

                            <div className="pest-detail-icon">
                                {getIcon(selectedProblem)}
                            </div>

                            <div className="pest-detail-title">

                                <span
                                    className={
                                        selectedProblem.type === "Pest"
                                            ? "pest-type pest-type-pest"
                                            : "pest-type pest-type-disease"
                                    }
                                >
                                    {selectedProblem.type}
                                </span>

                                <h2>
                                    {selectedProblem.name}
                                </h2>

                                <div className="pest-detail-meta">

                                    <span>
                                        🌱 {crop}
                                    </span>

                                    <span
                                        className={`severity-badge ${getSeverityClass(
                                            selectedProblem.severity
                                        )}`}
                                    >
                                        {selectedProblem.severity} Severity
                                    </span>

                                </div>

                            </div>

                        </div>


                        <div className="pest-detail-divider" />


                        {/* SYMPTOMS */}

                        <div className="pest-detail-block">

                            <div className="detail-block-title">
                                <span>🔍</span>

                                <h3>
                                    Symptoms
                                </h3>
                            </div>

                            <ul>
                                {selectedProblem.symptoms?.map(
                                    (symptom, index) => (
                                        <li key={index}>
                                            {symptom}
                                        </li>
                                    )
                                )}
                            </ul>

                        </div>


                        {/* FAVORABLE CONDITIONS */}

                        <div className="pest-detail-block">

                            <div className="detail-block-title">
                                <span>🌦️</span>

                                <h3>
                                    Favorable Conditions
                                </h3>
                            </div>

                            <ul>
                                {selectedProblem.favorableConditions?.map(
                                    (condition, index) => (
                                        <li key={index}>
                                            {condition}
                                        </li>
                                    )
                                )}
                            </ul>

                        </div>


                        {/* PREVENTION */}

                        <div className="pest-detail-block">

                            <div className="detail-block-title">
                                <span>🛡️</span>

                                <h3>
                                    Prevention
                                </h3>
                            </div>

                            <ul>
                                {selectedProblem.prevention?.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>

                        </div>


                        {/* MANAGEMENT */}

                        <div className="pest-detail-block">

                            <div className="detail-block-title">
                                <span>⚙️</span>

                                <h3>
                                    Management
                                </h3>
                            </div>

                            <ul>
                                {selectedProblem.management?.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>

                        </div>


                        {/* DISCLAIMER */}

                        <div className="pest-advisory-note">

                            <span className="note-icon">
                                ⚠️
                            </span>

                            <div>
                                <strong>
                                    Important Advisory
                                </strong>

                                <p>
                                    These recommendations are advisory
                                    and should not be treated as a
                                    confirmed diagnosis. For serious or
                                    uncertain cases, consult a qualified
                                    agricultural expert or use appropriate
                                    field or laboratory testing.
                                </p>
                            </div>

                        </div>

                    </div>

                </section>
            )}

        </main>
    );
}

export default PestDiseaseAdvisor;