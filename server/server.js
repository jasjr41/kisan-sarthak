const express = require("express");
const cors = require("cors");
require("dotenv").config();
const weatherRoutes = require("./routes/weatherRoutes");
const cropRoutes = require("./routes/cropRoutes");
const fertilizerRoutes = require("./routes/fertilizerRoutes");
const pestDiseaseRoutes = require("./routes/pestDiseaseRoutes");
const farmRoutes = require("./routes/farmRoutes");
const authRoutes = require("./routes/authRoutes");
const farmingHistoryRoutes = require("./routes/farmingHistoryRoutes");


const connectDB = require("./config/db.js");

const app = express();
const deficiencyRoutes = require("./routes/deficiencyRoutes");


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/weather", weatherRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/deficiencies", deficiencyRoutes);
app.use("/api/pest-diseases", pestDiseaseRoutes);
app.use("/api/pest-diseases", pestDiseaseRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/auth", authRoutes);
app.use(
    "/api/farming-history",
    farmingHistoryRoutes
);
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);
// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Farming Advisor API is running"
    });
});
app.use("/api/weather", weatherRoutes);


const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};


startServer();