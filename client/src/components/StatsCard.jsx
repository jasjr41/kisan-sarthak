function StatsCard({ weather, forecast }) {
  if (!weather) {
    return null;
  }

  const totalRain = forecast
    ? forecast.reduce((sum, item) => sum + (item.rain || 0), 0)
    : 0;

  const rainExpected = totalRain > 0;

  return (
    <section className="stats-section">

      <div className="stat-item">
        <div className="stat-icon">
          🌡️
        </div>

        <div>
          <p>Temperature</p>
          <h3>{Math.round(weather.temperature)}°C</h3>
        </div>
      </div>


      <div className="stat-item">
        <div className="stat-icon">
          💧
        </div>

        <div>
          <p>Humidity</p>
          <h3>{weather.humidity}%</h3>
        </div>
      </div>


      <div className="stat-item">
        <div className="stat-icon">
          🌧️
        </div>

        <div>
          <p>Rain Forecast</p>

          <h3>
            {rainExpected ? "Expected" : "No Rain"}
          </h3>
        </div>
      </div>


      <div className="stat-item">
        <div className="stat-icon">
          💨
        </div>

        <div>
          <p>Wind Speed</p>
          <h3>{weather.windSpeed.toFixed(1)} m/s</h3>
        </div>
      </div>

    </section>
  );
}

export default StatsCard;