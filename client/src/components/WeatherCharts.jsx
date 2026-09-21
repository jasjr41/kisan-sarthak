import { useMemo } from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";


// ==========================================
// WEATHER CHARTS
// ==========================================

function WeatherCharts({ forecast = [] }) {

    // ==========================================
    // PREPARE FORECAST DATA
    // ==========================================

    const chartData = useMemo(() => {

        if (!Array.isArray(forecast)) {
            return [];
        }

        return forecast.map((day) => {

            const date = new Date(day.date);

            return {
                date: date.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short"
                }),

                temperature:
                    Number(day.temperature) || 0,

                humidity:
                    Number(day.humidity) || 0,

                windSpeed:
                    Number(day.windSpeed) || 0,

                rain:
                    Number(day.rain) || 0
            };

        });

    }, [forecast]);


    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (!chartData.length) {

        return (
            <section className="weather-charts">

                <div className="charts-header">

                    <span className="charts-eyebrow">
                        WEATHER ANALYTICS
                    </span>

                    <h2>
                        Weather Trends
                    </h2>

                    <p>
                        Forecast chart data is currently unavailable.
                    </p>

                </div>

            </section>
        );

    }


    return (

        <section className="weather-charts">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="charts-header">

                <span className="charts-eyebrow">
                    WEATHER ANALYTICS
                </span>

                <h2>
                    Weather Trends 📊
                </h2>

                <p>
                    Visualize upcoming temperature, humidity,
                    rainfall and wind conditions.
                </p>

            </div>


            {/* ==========================================
                TEMPERATURE CHART
            ========================================== */}

            <div className="chart-card">

                <div className="chart-card-header">

                    <div>

                        <h3>
                            🌡️ Temperature Trend
                        </h3>

                        <p>
                            Forecast temperature for upcoming days
                        </p>

                    </div>

                </div>


                <div className="chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis
                                unit="°C"
                            />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="temperature"
                                name="Temperature"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* ==========================================
                HUMIDITY CHART
            ========================================== */}

            <div className="chart-card">

                <div className="chart-card-header">

                    <div>

                        <h3>
                            💧 Humidity Trend
                        </h3>

                        <p>
                            Forecast relative humidity
                        </p>

                    </div>

                </div>


                <div className="chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis
                                domain={[0, 100]}
                                unit="%"
                            />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="humidity"
                                name="Humidity"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* ==========================================
                RAINFALL CHART
            ========================================== */}

            <div className="chart-card">

                <div className="chart-card-header">

                    <div>

                        <h3>
                            🌧️ Rainfall Forecast
                        </h3>

                        <p>
                            Expected rainfall for upcoming days
                        </p>

                    </div>

                </div>


                <div className="chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis
                                unit=" mm"
                            />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="rain"
                                name="Rainfall"
                                radius={[6, 6, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* ==========================================
                WIND SPEED CHART
            ========================================== */}

            <div className="chart-card">

                <div className="chart-card-header">

                    <div>

                        <h3>
                            💨 Wind Speed Trend
                        </h3>

                        <p>
                            Forecast wind speed for upcoming days
                        </p>

                    </div>

                </div>


                <div className="chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis
                                unit=" m/s"
                            />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="windSpeed"
                                name="Wind Speed"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </section>

    );

}


export default WeatherCharts;