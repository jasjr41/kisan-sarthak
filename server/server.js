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

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

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

// Root route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Farming Advisor API is running"
    });
});

// Local development
if (require.main === module) {
    const PORT = process.env.PORT || 5000;

    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error("Failed to start server:", error.message);
        });
}

module.exports = app;