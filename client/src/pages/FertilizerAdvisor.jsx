import { useEffect, useState } from "react";
import axios from "axios";

function FertilizerAdvisor() {
  const [fertilizers, setFertilizers] = useState([]);
  const [deficiencies, setDeficiencies] = useState([]);

  const [crop, setCrop] = useState("wheat");
  const [growthStage, setGrowthStage] = useState("vegetative");
  const [soilType, setSoilType] = useState("loamy");
  const [nutrient, setNutrient] = useState("none");
  const [selectedSymptom, setSelectedSymptom] = useState("");

  const [recommendations, setRecommendations] = useState([]);
  const [detectedDeficiency, setDetectedDeficiency] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH FERTILIZERS + DEFICIENCIES
  // ==========================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fertilizerResponse, deficiencyResponse] =
          await Promise.all([
            axios.get("http://localhost:5000/api/fertilizers"),
            axios.get("http://localhost:5000/api/deficiencies")
          ]);

        setFertilizers(fertilizerResponse.data.data);
        setDeficiencies(deficiencyResponse.data.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load fertilizer and deficiency information.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================================
  // GET SYMPTOMS AVAILABLE FOR SELECTED CROP
  // ==========================================
  const cropDeficiencies = deficiencies.filter((item) =>
    item.crops.some(
      (cropName) =>
        cropName.toLowerCase() === crop.toLowerCase()
    )
  );

  const availableSymptoms = [
    ...new Set(
      cropDeficiencies.flatMap(
        (deficiency) => deficiency.symptoms
      )
    )
  ];

  // ==========================================
  // DETECT DEFICIENCY
  // ==========================================
  const detectDeficiency = () => {
  if (!selectedSymptom) {
    setDetectedDeficiency(null);
    setRecommendations([]);
    return;
  }

  const symptomMatches = cropDeficiencies.filter(
    (deficiency) =>
      deficiency.symptoms.some(
        (symptom) =>
          symptom.toLowerCase() ===
          selectedSymptom.toLowerCase()
      )
  );

  if (symptomMatches.length === 0) {
    setDetectedDeficiency(null);
    setRecommendations([]);
    return;
  }

  // Store the first matching deficiency for the main result
  const primaryDeficiency = symptomMatches[0];

  setDetectedDeficiency(primaryDeficiency);

  // Find fertilizers for the detected nutrient
  const matchingFertilizers = fertilizers.filter(
    (fertilizer) => {
      const cropMatch = fertilizer.suitableCrops.some(
        (item) =>
          item.toLowerCase() === crop.toLowerCase()
      );

      const stageMatch = fertilizer.suitableStages.some(
        (item) =>
          item.toLowerCase() ===
          growthStage.toLowerCase()
      );

      const soilMatch = fertilizer.suitableSoils.some(
        (item) =>
          item.toLowerCase() ===
          soilType.toLowerCase()
      );

      const nutrientMatch = symptomMatches.some(
        (deficiency) =>
          fertilizer.nutrient
            .toLowerCase()
            .includes(
              deficiency.nutrient.toLowerCase()
            )
      );

      return (
        cropMatch &&
        stageMatch &&
        soilMatch &&
        nutrientMatch
      );
    }
  );

  setRecommendations(matchingFertilizers);
};

  // ==========================================
  // NORMAL FERTILIZER ADVISORY
  // ==========================================
  const getFertilizerAdvice = () => {
    setDetectedDeficiency(null);

    const filtered = fertilizers.filter(
      (fertilizer) => {
        const cropMatch = fertilizer.suitableCrops.some(
          (item) =>
            item.toLowerCase() === crop.toLowerCase()
        );

        const stageMatch = fertilizer.suitableStages.some(
          (item) =>
            item.toLowerCase() ===
            growthStage.toLowerCase()
        );

        const soilMatch = fertilizer.suitableSoils.some(
          (item) =>
            item.toLowerCase() ===
            soilType.toLowerCase()
        );

        const nutrientMatch =
          nutrient === "none" ||
          fertilizer.nutrient
            .toLowerCase()
            .includes(nutrient.toLowerCase());

        return (
          cropMatch &&
          stageMatch &&
          soilMatch &&
          nutrientMatch
        );
      }
    );

    setRecommendations(filtered);
  };

  // ==========================================
  // RESET SYMPTOM WHEN CROP CHANGES
  // ==========================================
  const handleCropChange = (e) => {
    setCrop(e.target.value);
    setSelectedSymptom("");
    setDetectedDeficiency(null);
    setRecommendations([]);
  };

  return (
    <main>
      <section className="fertilizer-page">

        {/* HEADER */}
        <div className="page-header">
          <h1>🧪 Smart Fertilizer Advisor</h1>

          <p>
            Get fertilizer recommendations using crop,
            soil, growth stage and nutrient symptoms.
          </p>
        </div>

        {/* FORM */}
        <div className="fertilizer-form">

          {/* CROP */}
          <div className="form-group">
            <label>Crop</label>

            <select
              value={crop}
              onChange={handleCropChange}
            >
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="maize">Maize</option>
              <option value="potato">Potato</option>
              <option value="tomato">Tomato</option>
              <option value="cotton">Cotton</option>
              <option value="mustard">Mustard</option>
              <option value="sugarcane">Sugarcane</option>
            </select>
          </div>

          {/* GROWTH STAGE */}
          <div className="form-group">
            <label>Growth Stage</label>

            <select
              value={growthStage}
              onChange={(e) =>
                setGrowthStage(e.target.value)
              }
            >
              <option value="sowing">Sowing</option>
              <option value="vegetative">
                Vegetative
              </option>
              <option value="flowering">
                Flowering
              </option>
              <option value="maturity">Maturity</option>
              <option value="harvesting">
                Harvesting
              </option>
            </select>
          </div>

          {/* SOIL */}
          <div className="form-group">
            <label>Soil Type</label>

            <select
              value={soilType}
              onChange={(e) =>
                setSoilType(e.target.value)
              }
            >
              <option value="loamy">Loamy</option>
              <option value="clay">Clay</option>
              <option value="clay loam">
                Clay Loam
              </option>
              <option value="sandy loam">
                Sandy Loam
              </option>
              <option value="black soil">
                Black Soil
              </option>
              <option value="well-drained soil">
                Well-drained Soil
              </option>
            </select>
          </div>

          {/* NUTRIENT */}
          <div className="form-group">
            <label>Nutrient Requirement</label>

            <select
              value={nutrient}
              onChange={(e) =>
                setNutrient(e.target.value)
              }
            >
              <option value="none">
                No Known Deficiency
              </option>

              <option value="nitrogen">
                Nitrogen
              </option>

              <option value="phosphorus">
                Phosphorus
              </option>

              <option value="potassium">
                Potassium
              </option>

              <option value="zinc">
                Zinc
              </option>

              <option value="sulphur">
                Sulphur
              </option>

              <option value="iron">
                Iron
              </option>

              <option value="manganese">
                Manganese
              </option>
            </select>
          </div>

          {/* NORMAL ADVICE BUTTON */}
          <button
            className="advice-button"
            onClick={getFertilizerAdvice}
            disabled={loading}
          >
            Get Fertilizer Advice
          </button>
        </div>

        {/* ======================================
            SYMPTOM DETECTION
        ====================================== */}

        {!loading && !error && (
          <div className="symptom-section">

            <div className="page-header">
              <h2>🔍 Nutrient Deficiency Detection</h2>

              <p>
                Select a visible plant symptom to identify
                a possible nutrient deficiency.
              </p>
            </div>

            <div className="symptom-form">

              <div className="form-group">
                <label>
                  Observed Plant Symptom
                </label>

                <select
                  value={selectedSymptom}
                  onChange={(e) => {
                    setSelectedSymptom(e.target.value);
                    setDetectedDeficiency(null);
                    setRecommendations([]);
                  }}
                >
                  <option value="">
                    Select a symptom
                  </option>

                  {availableSymptoms.map(
                    (symptom, index) => (
                      <option
                        key={index}
                        value={symptom}
                      >
                        {symptom}
                      </option>
                    )
                  )}
                </select>
              </div>

              <button
                className="advice-button"
                onClick={detectDeficiency}
                disabled={!selectedSymptom}
              >
                🔍 Detect Deficiency
              </button>

            </div>

            {/* DETECTED DEFICIENCY */}
            {detectedDeficiency && (
              <div className="deficiency-result">

                <div className="deficiency-icon">
                  ⚠️
                </div>

                <h2>
                  Possible{" "}
                  {detectedDeficiency.nutrient} Deficiency
                </h2>

                <p>
                  <strong>Observed Symptom:</strong>{" "}
                  {selectedSymptom}
                </p>

                <p>
                  <strong>Analysis:</strong>{" "}
                  {detectedDeficiency.explanation}
                </p>

                <p className="deficiency-warning">
                  This is a symptom-based indication, not a
                  confirmed diagnosis. Soil or plant tissue
                  testing is recommended for confirmation.
                </p>

              </div>
            )}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="fertilizer-placeholder">
            <span>⏳</span>

            <p>
              Loading fertilizer and deficiency data...
            </p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="error-message">
            <span>⚠️</span>

            <p>{error}</p>
          </div>
        )}

        {/* ======================================
            RECOMMENDATIONS
        ====================================== */}

        {!loading &&
          !error &&
          recommendations.length > 0 && (
            <div className="fertilizer-results">

              <h2>
                Recommended Fertilizers 🌱
              </h2>

              <p className="recommendation-summary">
                Recommendations for{" "}
                <strong>{crop}</strong> during the{" "}
                <strong>{growthStage}</strong> stage
                in <strong>{soilType}</strong> soil.
              </p>

              <div className="fertilizer-grid">

                {recommendations.map(
                  (fertilizer) => (
                    <div
                      className="fertilizer-card"
                      key={fertilizer._id}
                    >

                      <div className="fertilizer-icon">
                        🧪
                      </div>

                      <h3>
                        {fertilizer.name}
                      </h3>

                      <p>
                        <strong>Nutrient:</strong>{" "}
                        {fertilizer.nutrient}
                      </p>

                      <p>
                        <strong>Composition:</strong>{" "}
                        {fertilizer.composition}
                      </p>

                      <p>
                        <strong>Purpose:</strong>{" "}
                        {fertilizer.purpose}
                      </p>

                      <p>
                        <strong>Guidance:</strong>{" "}
                        {fertilizer.guidance}
                      </p>

                    </div>
                  )
                )}

              </div>

              <div className="fertilizer-note">
                <strong>⚠️ Important:</strong>{" "}
                Fertilizer application should preferably be
                based on soil-test results and recommended
                agricultural practices.
              </div>

            </div>
          )}

        {/* NO RESULTS */}
        {!loading &&
          !error &&
          recommendations.length === 0 &&
          detectedDeficiency && (
            <div className="fertilizer-placeholder">

              <span>🔍</span>

              <p>
                No suitable fertilizer was found for the
                selected crop, growth stage and soil type.
              </p>

            </div>
          )}

      </section>
    </main>
  );
}

export default FertilizerAdvisor;