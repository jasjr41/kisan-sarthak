function SearchForm({
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
  loading
}) {
  return (
    <section className="search-section">

      <h2>Get Farming Advice 🌱</h2>

      <p>
        Enter your location and select your crop to receive
        personalized farming recommendations.
      </p>

      <div className="search-form">

        <div className="form-group">
          <label>City</label>

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Crop</label>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          >
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="maize">Maize</option>
            <option value="potato">Potato</option>
            <option value="tomato">Tomato</option>
            <option value="cotton">Cotton</option>
          </select>
        </div>
        <div className="form-group">
          <label>Growth Stage</label>

          <select
            value={growthStage}
            onChange={(e) => setGrowthStage(e.target.value)}
          >
            <option value="sowing">Sowing</option>
            <option value="vegetative">Vegetative</option>
            <option value="flowering">Flowering</option>
            <option value="maturity">Maturity</option>
            <option value="harvesting">Harvesting</option>
          </select>
        </div>

        <div className="form-group">
          <label>Soil Type</label>

          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="loamy">Loamy</option>
            <option value="clay">Clay</option>
            <option value="clay loam">Clay Loam</option>
            <option value="sandy loam">Sandy Loam</option>
            <option value="black soil">Black Soil</option>
            <option value="well-drained soil">Well-drained Soil</option>
          </select>
        </div>
        <div className="form-group">
          <label>Farming Activity</label>

          <select
            value={farmingActivity}
            onChange={(e) => setFarmingActivity(e.target.value)}
          >
            <option value="general">General Farming</option>
            <option value="sowing">Sowing</option>
            <option value="irrigation">Irrigation</option>
            <option value="fertilizer">Fertilizer Application</option>
            <option value="pest-control">Pest Control</option>
            <option value="harvesting">Harvesting</option>
          </select>
        </div>


        <button
          className="advice-button"
          onClick={getWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Farming Advice"}
        </button>

      </div>

      <div className="location-divider">
        <span>OR</span>
      </div>

      <button
        className="location-button"
        onClick={getLocationWeather}
        disabled={loading}
      >
        📍 Use My Location
      </button>

    </section>
  );
}

export default SearchForm;