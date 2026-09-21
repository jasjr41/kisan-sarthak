/*
==========================================
RECOMMENDATION PRIORITY CLASSIFIER
==========================================
*/

const getRecommendationCategory = (text) => {

    if (
        text.includes("temperature") ||
        text.includes("heat") ||
        text.includes("cold") ||
        text.includes("humidity") ||
        text.includes("weather")
    ) {
        return "Weather";
    }


    if (
        text.includes("irrigation") ||
        text.includes("water") ||
        text.includes("soil moisture")
    ) {
        return "Irrigation";
    }


    if (
        text.includes("fertilizer") ||
        text.includes("nutrient")
    ) {
        return "Fertilizer";
    }


    if (
        text.includes("pest") ||
        text.includes("fungal") ||
        text.includes("disease") ||
        text.includes("spraying") ||
        text.includes("crop protection")
    ) {
        return "Crop Protection";
    }


    if (
        text.includes("sowing") ||
        text.includes("flowering") ||
        text.includes("vegetative") ||
        text.includes("maturity") ||
        text.includes("harvesting")
    ) {
        return "Growth Stage";
    }


    if (text.includes("soil")) {
        return "Soil";
    }


    return "General";
};


/*
==========================================
RECOMMENDATION PRIORITY CLASSIFIER
==========================================
*/

const classifyRecommendation = (recommendation) => {

    const text = String(recommendation).toLowerCase();


    // ==========================================
    // HIGH PRIORITY
    // ==========================================

    if (
        text.includes("extreme heat") ||
        text.includes("high temperature") ||
        text.includes("temperature is above") ||
        text.includes("heat stress") ||
        text.includes("cold stress") ||
        text.includes("strong winds") ||
        text.includes("heavy rainfall") ||
        text.includes("waterlogging") ||
        text.includes("fungal disease") ||
        text.includes("pesticide spraying") ||
        text.includes("spraying advisory")
    ) {

        return {
            priority: "High",
            category: getRecommendationCategory(text),
            icon: "🚨"
        };

    }


    // ==========================================
    // MEDIUM PRIORITY
    // ==========================================

    if (
        text.includes("monitor") ||
        text.includes("irrigation advisory") ||
        text.includes("water stress") ||
        text.includes("rainfall") ||
        text.includes("humidity") ||
        text.includes("wind conditions") ||
        text.includes("fertilizer advisory") ||
        text.includes("pest control advisory") ||
        text.includes("harvesting advisory")
    ) {

        return {
            priority: "Medium",
            category: getRecommendationCategory(text),
            icon: "⚠️"
        };

    }


    // ==========================================
    // LOW PRIORITY
    // ==========================================

    return {
        priority: "Low",
        category: getRecommendationCategory(text),
        icon: "💡"
    };
};


/*
==========================================
GENERATE RECOMMENDATIONS
==========================================
*/

const generateRecommendations = (
    weather,
    cropData,
    growthStage,
    forecast,
    soilType,
    farmingActivity
) => {

    const recommendations = [];
    const alerts = [];


    // --------------------------------
    // SOIL SUITABILITY
    // --------------------------------

    if (soilType) {

        const selectedSoil =
            soilType.toLowerCase();

        const suitableSoils =
            cropData.soilTypes.map(
                (soil) => soil.toLowerCase()
            );


        if (suitableSoils.includes(selectedSoil)) {

            recommendations.push(
                `Soil suitability: ${cropData.name} is suitable for ${soilType} soil according to the farming database.`
            );

        } else {

            recommendations.push(
                `Soil suitability: ${cropData.name} is not listed as a preferred crop for ${soilType} soil. Consider checking soil conditions and crop suitability before cultivation.`
            );

        }

    }


    // --------------------------------
    // SOIL-SPECIFIC IRRIGATION ADVICE
    // --------------------------------

    if (soilType) {

        const selectedSoil =
            soilType.toLowerCase();


        if (selectedSoil === "sandy loam") {

            recommendations.push(
                "Soil irrigation advice: Sandy loam soil generally drains water quickly. Monitor soil moisture regularly and provide irrigation when the crop requires it."
            );

        }


        else if (
            selectedSoil === "clay" ||
            selectedSoil === "clay loam"
        ) {

            recommendations.push(
                "Soil irrigation advice: Clay-based soil can retain water for longer periods. Avoid excessive irrigation and check soil moisture before watering."
            );

        }


        else if (selectedSoil === "loamy") {

            recommendations.push(
                "Soil irrigation advice: Loamy soil generally provides a balance between water retention and drainage. Maintain irrigation according to crop growth stage and weather conditions."
            );

        }


        else if (
            selectedSoil === "well-drained soil"
        ) {

            recommendations.push(
                "Soil irrigation advice: Well-drained soil allows excess water to drain effectively. Monitor soil moisture and adjust irrigation according to weather and crop requirements."
            );

        }


        else if (selectedSoil === "black soil") {

            recommendations.push(
                "Soil irrigation advice: Black soil can retain considerable moisture. Check soil moisture before irrigation and avoid unnecessary watering."
            );

        }

    }


    const cropName =
        cropData.name;


    // --------------------------------
    // TEMPERATURE ANALYSIS
    // --------------------------------

    if (
        weather.temperature >
        cropData.temperature.max
    ) {

        recommendations.push(
            `Temperature is above the preferred range for ${cropName}. Monitor the crop for heat stress and maintain adequate soil moisture.`
        );


        alerts.push(
            `High temperature detected for ${cropName}. Crop may experience heat stress.`
        );

    }


    else if (
        weather.temperature <
        cropData.temperature.min
    ) {

        recommendations.push(
            `Temperature is below the preferred range for ${cropName}. Monitor the crop for cold stress.`
        );


        alerts.push(
            `Low temperature detected for ${cropName}. Monitor the crop for cold stress.`
        );

    }


    else {

        recommendations.push(
            `Temperature conditions are within the preferred range for ${cropName}.`
        );

    }


    // --------------------------------
    // HUMIDITY ANALYSIS
    // --------------------------------

    if (weather.humidity >= 80) {

        recommendations.push(
            "High humidity detected. Monitor the crop for fungal diseases and ensure proper field drainage."
        );


        alerts.push(
            "High humidity may increase the risk of fungal diseases."
        );

    }


    else if (weather.humidity >= 60) {

        recommendations.push(
            "Moderate humidity detected. Continue monitoring crop moisture."
        );

    }


    else {

        recommendations.push(
            "Low humidity detected. Monitor soil moisture and the crop for water stress."
        );

    }


    // --------------------------------
    // WEATHER CONDITION
    // --------------------------------

    if (
        weather.weather === "Rain" ||
        weather.weather === "Drizzle"
    ) {

        recommendations.push(
            "Rainy weather detected. Avoid unnecessary irrigation and ensure proper field drainage."
        );


        alerts.push(
            "Rainy conditions detected. Avoid unnecessary irrigation."
        );

    }


    else if (
        weather.weather === "Clouds"
    ) {

        recommendations.push(
            "Cloudy conditions detected. Monitor rainfall before deciding on irrigation."
        );

    }


    else if (
        weather.weather === "Clear"
    ) {

        recommendations.push(
            "Clear weather detected. Continue regular crop monitoring and irrigation based on soil moisture."
        );

    }


    // --------------------------------
    // WIND ANALYSIS
    // --------------------------------

    if (weather.windSpeed >= 10) {

        recommendations.push(
            "Strong winds detected. Avoid pesticide spraying and provide support to tall or vulnerable crops."
        );


        alerts.push(
            "Strong winds detected. Avoid spraying pesticides until wind conditions improve."
        );

    }


    else if (weather.windSpeed >= 6) {

        recommendations.push(
            "Moderate wind conditions detected. Monitor crops for physical damage."
        );

    }


    // --------------------------------
    // GENERAL IRRIGATION GUIDANCE
    // --------------------------------

    recommendations.push(
        cropData.irrigationGuidance
    );


    // --------------------------------
    // WATER REQUIREMENT
    // --------------------------------

    recommendations.push(
        `${cropName} has a ${cropData.waterRequirement.toLowerCase()} water requirement. Adjust irrigation according to soil moisture and weather conditions.`
    );


    // --------------------------------
    // FERTILIZER GUIDANCE
    // --------------------------------

    recommendations.push(
        `Fertilizer guidance: ${cropData.fertilizerGuidance}`
    );


    // --------------------------------
    // CROP PROTECTION
    // --------------------------------

    recommendations.push(
        `Crop protection: ${cropData.cropProtection}`
    );


    // --------------------------------
    // WEATHER RISK ANALYSIS
    // --------------------------------

    if (
        weather.temperature >
        cropData.temperature.max
    ) {

        const heatRisk =
            cropData.weatherRisks.find(
                (risk) =>
                    risk.toLowerCase().includes("heat")
            );


        if (heatRisk) {

            recommendations.push(
                `${cropName} weather risk: ${heatRisk}.`
            );

        }

    }


    if (
        weather.temperature <
        cropData.temperature.min
    ) {

        const coldRisk =
            cropData.weatherRisks.find(
                (risk) =>
                    risk.toLowerCase().includes("frost") ||
                    risk.toLowerCase().includes("cold")
            );


        if (coldRisk) {

            recommendations.push(
                `${cropName} weather risk: ${coldRisk}.`
            );

        }

    }


    if (
        weather.weather === "Rain" ||
        weather.weather === "Drizzle"
    ) {

        const rainRisk =
            cropData.weatherRisks.find(
                (risk) =>
                    risk.toLowerCase().includes("rain")
            );


        if (rainRisk) {

            recommendations.push(
                `${cropName} weather risk: ${rainRisk}.`
            );

        }

    }


    // --------------------------------
    // GROWTH STAGE
    // --------------------------------

    if (growthStage === "sowing") {

        recommendations.push(
            "During sowing, ensure adequate soil moisture before planting."
        );


        if (
            weather.temperature >
            cropData.temperature.max
        ) {

            recommendations.push(
                "High temperature during sowing may affect seed establishment. Monitor soil moisture carefully."
            );

        }

    }


    if (growthStage === "vegetative") {

        recommendations.push(
            "During the vegetative stage, monitor soil moisture and maintain healthy crop growth."
        );


        if (
            weather.temperature >
            cropData.temperature.max
        ) {

            recommendations.push(
                "High temperature during vegetative growth can increase water demand. Monitor the crop for water stress."
            );

        }

    }


    if (growthStage === "flowering") {

        recommendations.push(
            "Flowering is a sensitive growth stage. Maintain suitable soil moisture and monitor weather conditions closely."
        );


        if (
            weather.temperature >
            cropData.temperature.max
        ) {

            recommendations.push(
                "High temperature during flowering may cause heat stress. Monitor the crop closely."
            );

        }

    }


    if (growthStage === "maturity") {

        recommendations.push(
            "During maturity, avoid unnecessary irrigation and monitor weather conditions before harvesting."
        );


        if (
            weather.weather === "Rain" ||
            weather.weather === "Drizzle"
        ) {

            recommendations.push(
                "Rainy conditions during maturity may affect crop quality. Monitor the field and plan harvesting accordingly."
            );

        }

    }


    if (growthStage === "harvesting") {

        recommendations.push(
            "Before harvesting, check upcoming weather conditions and avoid harvesting during heavy rainfall."
        );


        if (
            weather.weather === "Rain" ||
            weather.weather === "Drizzle"
        ) {

            alerts.push(
                "Rainy conditions detected. Consider delaying harvesting if field conditions are unsuitable."
            );

        }

    }


    // --------------------------------
    // FORECAST-BASED RECOMMENDATIONS
    // --------------------------------

    if (
        forecast &&
        forecast.length > 0
    ) {

        // --------------------------------
        // DAILY FORECAST ANALYSIS
        // --------------------------------

        const dailyForecast = {};


        forecast.forEach((item) => {

            const date =
                item.date.split(" ")[0];


            if (!dailyForecast[date]) {

                dailyForecast[date] = {

                    maxTemperature:
                        item.temperature,

                    minTemperature:
                        item.temperature,

                    totalRain: 0,

                    maxHumidity:
                        item.humidity,

                    maxWind:
                        item.windSpeed

                };

            }


            dailyForecast[date].maxTemperature =
                Math.max(
                    dailyForecast[date].maxTemperature,
                    item.temperature
                );


            dailyForecast[date].minTemperature =
                Math.min(
                    dailyForecast[date].minTemperature,
                    item.temperature
                );


            dailyForecast[date].totalRain +=
                item.rain || 0;


            dailyForecast[date].maxHumidity =
                Math.max(
                    dailyForecast[date].maxHumidity,
                    item.humidity
                );


            dailyForecast[date].maxWind =
                Math.max(
                    dailyForecast[date].maxWind,
                    item.windSpeed
                );

        });


        const forecastDays =
            Object.values(dailyForecast);


        // --------------------------------
        // IRRIGATION ADVISORY
        // --------------------------------

        let rainyDays = 0;
        let hotDryDays = 0;
        let highestTemperature = 0;


        forecastDays.forEach((day) => {

            // Significant rainfall

            if (day.totalRain >= 5) {

                rainyDays++;

            }


            // Hot and dry conditions

            if (
                day.maxTemperature >
                    cropData.temperature.max &&
                day.totalRain < 1
            ) {

                hotDryDays++;


                highestTemperature =
                    Math.max(
                        highestTemperature,
                        day.maxTemperature
                    );

            }

        });


        // --------------------------------
        // RAINFALL ADVISORY
        // --------------------------------

        if (rainyDays > 0) {

            recommendations.push(
                "Irrigation advisory: Significant rainfall is expected during the forecast period. Consider postponing irrigation and check soil moisture before watering."
            );

        }


        // --------------------------------
        // HOT AND DRY ADVISORY
        // --------------------------------

        if (hotDryDays > 0) {

            recommendations.push(
                `Irrigation advisory: Hot and relatively dry conditions are expected on ${hotDryDays} forecast day(s), with temperatures reaching approximately ${Math.round(highestTemperature)}°C. Monitor soil moisture closely and irrigate if required.`
            );

        }


        // --------------------------------
        // PESTICIDE SPRAYING ADVISORY
        // --------------------------------

        const rainySprayingDays =
            forecastDays.filter(
                (day) =>
                    day.totalRain >= 2
            ).length;


        const windySprayingDays =
            forecastDays.filter(
                (day) =>
                    day.maxWind >= 6
            ).length;


        const highestWind =
            Math.max(
                ...forecastDays.map(
                    (day) => day.maxWind
                )
            );


        // --------------------------------
        // RAIN SPRAYING ADVISORY
        // --------------------------------

        if (rainySprayingDays > 0) {

            recommendations.push(
                "Spraying advisory: Rainfall is expected during the forecast period. Avoid pesticide or foliar fertilizer application before rainfall because it may reduce treatment effectiveness."
            );

        }


        // --------------------------------
        // WIND SPRAYING ADVISORY
        // --------------------------------

        if (windySprayingDays > 0) {

            recommendations.push(
                `Spraying advisory: Strong winds may occur during the forecast period, reaching up to ${highestWind.toFixed(1)} m/s. Avoid pesticide spraying during strong wind conditions to reduce spray drift.`
            );

        }

    }


    // --------------------------------
    // FARMING ACTIVITY ADVICE
    // --------------------------------

    if (farmingActivity) {

        switch (farmingActivity) {

            case "sowing":

                recommendations.push(
                    `Sowing advisory: For ${cropData.name}, consider sowing when weather and soil conditions are suitable. Avoid sowing immediately before heavy rainfall or during unsuitable temperature conditions.`
                );

                break;


            case "irrigation":

                recommendations.push(
                    `Irrigation advisory: For ${cropData.name}, check soil moisture and upcoming rainfall before irrigation. Adjust watering according to the ${growthStage} growth stage.`
                );

                break;


            case "fertilizer":

                recommendations.push(
                    `Fertilizer advisory: ${cropData.fertilizerGuidance}`
                );

                break;


            case "pest-control":

                recommendations.push(
                    `Pest control advisory: ${cropData.cropProtection}`
                );

                break;


            case "harvesting":

                recommendations.push(
                    `Harvesting advisory: Monitor ${cropData.name} maturity and weather conditions before harvesting. Avoid harvesting during heavy rainfall or strong winds when possible.`
                );

                break;


            case "general":

                recommendations.push(
                    `General farming advisory: Continue monitoring weather, soil moisture and ${cropData.name} growth conditions during the ${growthStage} stage.`
                );

                break;


            default:

                break;

        }

    }


    // ==========================================
    // PRIORITIZE RECOMMENDATIONS
    // ==========================================

    const prioritizedRecommendations =
        recommendations.map(
            (recommendation, index) => {

                const classification =
                    classifyRecommendation(
                        recommendation
                    );


                return {

                    id: index + 1,

                    text: recommendation,

                    priority:
                        classification.priority,

                    category:
                        classification.category,

                    icon:
                        classification.icon

                };

            }
        );


    // ==========================================
    // PRIORITY ORDER
    // ==========================================

    const priorityOrder = {

        High: 1,

        Medium: 2,

        Low: 3

    };


    // ==========================================
    // SORT RECOMMENDATIONS
    // ==========================================

    prioritizedRecommendations.sort(
        (a, b) =>
            priorityOrder[a.priority] -
            priorityOrder[b.priority]
    );


    // ==========================================
    // FINAL RESULT
    // ==========================================

    return {

        recommendations:
            prioritizedRecommendations,

        alerts

    };

};


// ==========================================
// EXPORT
// ==========================================
module.exports = {
    generateRecommendations
};