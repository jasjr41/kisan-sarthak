function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  return (
    <section className="weather-card">

      <div className="weather-header">
        <div>
          <h2>
            {weather.city}, {weather.country}
          </h2>

          <p>{weather.description}</p>
        </div>

        <div className="weather-icon">
          🌤️
        </div>
      </div>

      <div className="main-temperature">
        {Math.round(weather.temperature)}°C
      </div>

      <p className="feels-like">
        Feels like {Math.round(weather.feelsLike)}°C
      </p>

      <div className="weather-details">

        <div className="weather-detail">
          <span>💧</span>
          <div>
            <p>Humidity</p>
            <strong>{weather.humidity}%</strong>
          </div>
        </div>

        <div className="weather-detail">
          <span>💨</span>
          <div>
            <p>Wind Speed</p>
            <strong>{weather.windSpeed} m/s</strong>
          </div>
        </div>

        <div className="weather-detail">
          <span>🔵</span>
          <div>
            <p>Pressure</p>
            <strong>{weather.pressure} hPa</strong>
          </div>
        </div>

        <div className="weather-detail">
          <span>🌡️</span>
          <div>
            <p>Temperature</p>
            <strong>{Math.round(weather.temperature)}°C</strong>
          </div>
        </div>

      </div>

    </section>
  );
}

export default WeatherCard;