const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db.js");

const weatherRoutes = require("./routes/weatherRoutes.js");
const cropRoutes = require("./routes/cropRoutes.js");
const fertilizerRoutes = require("./routes/fertilizerRoutes.js");
const deficiencyRoutes = require("./routes/deficiencyRoutes.js");
const pestDiseaseRoutes = require("./routes/pestDiseaseRoutes.js");
const farmRoutes = require("./routes/farmRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const farmingHistoryRoutes = require("./routes/farmingHistoryRoutes.js");
const aiRoutes = require("./routes/aiRoutes.js");
const weatherDashboardRoutes = require("./routes/weatherDashboardRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Smart Farming Advisor API is running"
    });
});

app.use("/api/weather", weatherRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/deficiencies", deficiencyRoutes);
app.use("/api/pest-diseases", pestDiseaseRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/farming-history", farmingHistoryRoutes);
app.use("/api/ai", aiRoutes);
app.use(
    "/api/weather/dashboard",
    weatherDashboardRoutes
);

module.exports = async (req, res) => {
    try {
        await connectDB();
        return app(req, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
};