function ForecastCard({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  // GROUP FORECAST BY DAY
  const dailyForecast = {};

  forecast.forEach((item) => {
    const date = item.date.split(" ")[0];

    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        date: date,
        maxTemperature: item.temperature,
        minTemperature: item.temperature,
        totalRain: 0,
        maxHumidity: item.humidity,
        maxWind: item.windSpeed,
        weather: item.weather,
        description: item.description
      };
    }

    dailyForecast[date].maxTemperature = Math.max(
      dailyForecast[date].maxTemperature,
      item.temperature
    );

    dailyForecast[date].minTemperature = Math.min(
      dailyForecast[date].minTemperature,
      item.temperature
    );

    dailyForecast[date].totalRain += item.rain || 0;

    dailyForecast[date].maxHumidity = Math.max(
      dailyForecast[date].maxHumidity,
      item.humidity
    );

    dailyForecast[date].maxWind = Math.max(
      dailyForecast[date].maxWind,
      item.windSpeed
    );

    // Prefer Rain if rain occurs during the day
    if (item.weather === "Rain") {
      dailyForecast[date].weather = "Rain";
      dailyForecast[date].description = item.description;
    }
  });

  const forecastDays = Object.values(dailyForecast);

  // WEATHER ICON
  const getWeatherIcon = (weather) => {
    if (weather === "Rain") return "🌧️";
    if (weather === "Clouds") return "☁️";
    if (weather === "Clear") return "☀️";
    if (weather === "Drizzle") return "🌦️";

    return "🌤️";
  };

  // FARMING IMPACT
  const getFarmingImpact = (day) => {
    if (day.totalRain >= 5) {
      return {
        icon: "🌧️",
        text: "Rain expected"
      };
    }

    if (day.maxWind >= 6) {
      return {
        icon: "💨",
        text: "Avoid spraying"
      };
    }

    if (day.maxTemperature >= 35) {
      return {
        icon: "🌡️",
        text: "High heat"
      };
    }

    if (day.totalRain > 0) {
      return {
        icon: "🌦️",
        text: "Light rain possible"
      };
    }

    return {
      icon: "🌱",
      text: "Good for field work"
    };
  };

  return (
    <section className="forecast-card">

      <div className="section-title">
        <span>📅</span>

        <div>
          <h2>5-Day Weather Forecast</h2>
          <p>Plan your farming activities ahead</p>
        </div>
      </div>

      <div className="forecast-grid">

        {forecastDays.map((day, index) => {

          const farmingImpact = getFarmingImpact(day);

          return (
            <div
              className="forecast-item"
              key={index}
            >

              {/* DATE */}
              <p className="forecast-date">
                {new Date(
                  day.date + "T00:00:00"
                ).toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                  }
                )}
              </p>

              {/* WEATHER ICON */}
              <div className="forecast-icon">
                {getWeatherIcon(day.weather)}
              </div>

              {/* TEMPERATURE */}
              <h3>
                {Math.round(day.maxTemperature)}°C

                <span className="min-temp">
                  / {Math.round(day.minTemperature)}°C
                </span>
              </h3>

              {/* DESCRIPTION */}
              <p className="forecast-description">
                {day.description}
              </p>

              {/* WEATHER DETAILS */}
              <div className="forecast-info">

                <span>
                  💧 {day.maxHumidity}%
                </span>

                <span>
                  💨 {day.maxWind.toFixed(1)} m/s
                </span>

              </div>

              {/* RAIN */}
              <div className="forecast-rain">

                {day.totalRain > 0 ? (
                  <span>
                    🌧️ {day.totalRain.toFixed(1)} mm
                  </span>
                ) : (
                  <span>
                    ☀️ No significant rain
                  </span>
                )}

              </div>

              {/* FARMING IMPACT */}
              <div className="farming-impact">

                <span>
                  {farmingImpact.icon}
                </span>

                <strong>
                  {farmingImpact.text}
                </strong>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default ForecastCard;