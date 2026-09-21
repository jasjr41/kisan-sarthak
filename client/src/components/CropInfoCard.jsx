function CropInfoCard({ crop }) {
  if (!crop) {
    return null;
  }

  return (
    <section className="crop-info-card">
      <div className="section-title">
        <span>🌾</span>

        <div>
          <h2>{crop.name} Information</h2>
          <p>Crop knowledge from the farming database</p>
        </div>
      </div>

      <div className="crop-info-grid">

        <div className="crop-info-item">
          <span>🌡️</span>
          <div>
            <p>Preferred Temperature</p>
            <strong>
              {crop.temperature.min}°C - {crop.temperature.max}°C
            </strong>
          </div>
        </div>

        <div className="crop-info-item">
          <span>💧</span>
          <div>
            <p>Water Requirement</p>
            <strong>{crop.waterRequirement}</strong>
          </div>
        </div>

        <div className="crop-info-item">
          <span>🌱</span>
          <div>
            <p>Suitable Soil</p>
            <strong>
              {crop.soilTypes.join(", ")}
            </strong>
          </div>
        </div>

        <div className="crop-info-item">
          <span>🌾</span>
          <div>
            <p>Growth Stages</p>
            <strong>
              {crop.growthStages.length}
            </strong>
          </div>
        </div>

      </div>

      <div className="crop-guidance">

        <div>
          <h3>💧 Irrigation Guidance</h3>
          <p>{crop.irrigationGuidance}</p>
        </div>

        <div>
          <h3>🧪 Fertilizer Guidance</h3>
          <p>{crop.fertilizerGuidance}</p>
        </div>

        <div>
          <h3>🛡️ Crop Protection</h3>
          <p>{crop.cropProtection}</p>
        </div>

      </div>

      <div className="crop-risks">
        <h3>⚠️ Weather Risks</h3>

        <div className="risk-list">
          {crop.weatherRisks.map((risk, index) => (
            <span key={index}>
              {risk}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CropInfoCard;