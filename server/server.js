const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");
const cropRoutes = require("./routes/cropRoutes");
const fertilizerRoutes = require("./routes/fertilizerRoutes");
const deficiencyRoutes = require("./routes/deficiencyRoutes");
const pestDiseaseRoutes = require("./routes/pestDiseaseRoutes");
const farmRoutes = require("./routes/farmRoutes");
const authRoutes = require("./routes/authRoutes");
const farmingHistoryRoutes = require("./routes/farmingHistoryRoutes");
const aiRoutes = require("./routes/aiRoutes");

const connectDB = require("./config/db.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/deficiencies", deficiencyRoutes);
app.use("/api/pest-diseases", pestDiseaseRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/farming-history", farmingHistoryRoutes);
app.use("/api/ai", aiRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Farming Advisor API is running"
    });
});

// Connect to MongoDB
connectDB();

// Local development
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export Express app for Vercel
module.exports = app;