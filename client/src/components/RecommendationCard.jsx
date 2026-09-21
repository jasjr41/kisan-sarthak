function RecommendationCard({ recommendations }) {
    if (!recommendations || recommendations.length === 0) {
        return null;
    }

    const priorityStyles = {
        High: {
            className: "priority-high",
            label: "High Priority",
            icon: "🚨"
        },

        Medium: {
            className: "priority-medium",
            label: "Medium Priority",
            icon: "⚠️"
        },

        Low: {
            className: "priority-low",
            label: "Low Priority",
            icon: "💡"
        }
    };

    const categoryIcons = {
        Weather: "🌡️",
        Irrigation: "💧",
        Fertilizer: "🧪",
        "Crop Protection": "🛡️",
        "Growth Stage": "🌱",
        Soil: "🌍",
        General: "🌾"
    };

    // =====================================================
    // LIMIT RECOMMENDATIONS
    // 2 High + 2 Medium + 2 Low
    // =====================================================

    const highRecommendations = recommendations
        .filter((recommendation) => recommendation.priority === "High")
        .slice(0, 2);

    const mediumRecommendations = recommendations
        .filter((recommendation) => recommendation.priority === "Medium")
        .slice(0, 2);

    const lowRecommendations = recommendations
        .filter((recommendation) => recommendation.priority === "Low")
        .slice(0, 2);

    const displayedRecommendations = [
        ...highRecommendations,
        ...mediumRecommendations,
        ...lowRecommendations
    ];

    // If there are no recommendations after filtering
    if (displayedRecommendations.length === 0) {
        return null;
    }

    return (
        <section className="recommendation-card">

            {/* Header */}
            <div className="section-title">

                <span>💡</span>

                <div>
                    <h2>Farming Recommendations</h2>

                    <p>
                        Personalized advice based on crop and weather conditions
                    </p>
                </div>

            </div>


            {/* Recommendations */}
            <div className="recommendation-list">

                {displayedRecommendations.map((recommendation) => {

                    const priority =
                        priorityStyles[recommendation.priority] ||
                        priorityStyles.Low;

                    const categoryIcon =
                        categoryIcons[recommendation.category] ||
                        "🌾";

                    return (
                        <div
                            className={`recommendation-item ${priority.className}`}
                            key={recommendation.id}
                        >

                            {/* Icon */}
                            <div className="recommendation-main-icon">
                                {recommendation.icon || categoryIcon}
                            </div>


                            {/* Content */}
                            <div className="recommendation-content">

                                <div className="recommendation-top">

                                    <span className="recommendation-category">
                                        {categoryIcon}{" "}
                                        {recommendation.category || "General"}
                                    </span>

                                    <span
                                        className={`priority-badge ${priority.className}`}
                                    >
                                        {priority.icon}{" "}
                                        {priority.label}
                                    </span>

                                </div>

                                <p>
                                    {recommendation.text}
                                </p>

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default RecommendationCard;