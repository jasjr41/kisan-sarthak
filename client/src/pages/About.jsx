function About() {
    const features = [
        {
            icon: "📍",
            title: "Automatic Location Detection",
            description:
                "Automatically detects the user's location and provides local weather information without requiring manual city selection.",
        },
        {
            icon: "🌦️",
            title: "Real-Time Weather",
            description:
                "Displays current temperature, feels-like temperature, humidity, wind speed, atmospheric pressure, and weather conditions.",
        },
        {
            icon: "📅",
            title: "5-Day Forecast",
            description:
                "Provides upcoming weather conditions with temperature, humidity, rainfall, and wind information.",
        },
        {
            icon: "📊",
            title: "Weather Visualization",
            description:
                "Interactive charts make temperature, humidity, and expected rainfall easier to understand.",
        },
        {
            icon: "🌱",
            title: "Farming Advisory",
            description:
                "Provides weather-based agricultural information to support better farming and crop management decisions.",
        },
        {
            icon: "🤖",
            title: "Intelligent Features",
            description:
                "The platform is designed to combine weather information with data-driven agricultural recommendations.",
        },
    ];

    const technologies = [
        {
            icon: "⚛️",
            name: "React.js",
            description: "Frontend development",
        },
        {
            icon: "🟢",
            name: "Node.js",
            description: "Backend runtime",
        },
        {
            icon: "🚂",
            name: "Express.js",
            description: "REST API development",
        },
        {
            icon: "🍃",
            name: "MongoDB",
            description: "Database management",
        },
        {
            icon: "🌐",
            name: "Weather API",
            description: "Real-time weather data",
        },
        {
            icon: "📈",
            name: "Recharts",
            description: "Weather visualization",
        },
    ];

    return (
        <div className="about-page">

            {/* HERO */}
            <section className="about-hero">
                <div className="about-hero-content">

                    <div className="about-badge">
                        🌾 Smart Farming Technology
                    </div>

                    <h1>
                        Smart Weather-Based
                        <span> Farming Advisor</span>
                    </h1>

                    <p>
                        A weather-driven agricultural platform designed
                        to help farmers understand local weather conditions
                        and make more informed farming decisions.
                    </p>

                    <div className="about-hero-actions">
                        <a
                            href="/weather"
                            className="about-primary-button"
                        >
                            🌦️ Check Weather
                        </a>

                        <a
                            href="/"
                            className="about-secondary-button"
                        >
                            🌱 Explore Advisory
                        </a>
                    </div>

                </div>

                <div className="about-hero-visual">
                    <div className="about-weather-card">

                        <div className="about-weather-icon">
                            ☀️
                        </div>

                        <div>
                            <span>
                                Smart Weather
                            </span>

                            <strong>
                                🌾
                            </strong>
                        </div>

                        <p>
                            Weather intelligence
                            <br />
                            for smarter farming
                        </p>

                    </div>
                </div>
            </section>


            {/* PROJECT OVERVIEW */}
            <section className="about-section">

                <div className="about-section-heading">
                    <span>📖</span>

                    <div>
                        <p className="about-eyebrow">
                            PROJECT OVERVIEW
                        </p>

                        <h2>
                            About the Application
                        </h2>
                    </div>
                </div>

                <div className="about-overview-card">

                    <div className="about-overview-icon">
                        🌾
                    </div>

                    <div>
                        <h3>
                            What is Smart Weather?
                        </h3>

                        <p>
                            <strong>
                                Smart Weather – Weather-Based Farming
                                Advisor
                            </strong>{" "}
                            is a web application developed to provide
                            farmers with useful weather information and
                            agricultural decision-support features.
                        </p>

                        <p>
                            The application uses location-based weather
                            data to display current atmospheric conditions
                            and upcoming forecasts. Users can view
                            temperature, humidity, wind speed, atmospheric
                            pressure, rainfall, and other weather
                            information through a simple and accessible
                            interface.
                        </p>

                        <p>
                            By combining weather information with
                            agricultural data and recommendations, the
                            platform aims to help farmers make more
                            informed decisions related to crop management,
                            irrigation, fertilizer application, and
                            weather-sensitive farming activities.
                        </p>
                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section className="about-section about-features-section">

                <div className="about-section-heading centered">

                    <div>
                        <p className="about-eyebrow">
                            WHAT THE PLATFORM OFFERS
                        </p>

                        <h2>
                            Key Features
                        </h2>

                        <p className="about-section-subtitle">
                            Tools designed to make weather information
                            easier to understand and more useful for
                            farming decisions.
                        </p>
                    </div>

                </div>

                <div className="about-features-grid">

                    {features.map((feature) => (
                        <div
                            className="about-feature-card"
                            key={feature.title}
                        >

                            <div className="about-feature-icon">
                                {feature.icon}
                            </div>

                            <h3>
                                {feature.title}
                            </h3>

                            <p>
                                {feature.description}
                            </p>

                        </div>
                    ))}

                </div>

            </section>


            {/* TECHNOLOGY STACK */}
            <section className="about-section">

                <div className="about-section-heading">

                    <span>🛠️</span>

                    <div>
                        <p className="about-eyebrow">
                            DEVELOPMENT
                        </p>

                        <h2>
                            Technology Stack
                        </h2>
                    </div>

                </div>

                <div className="about-tech-grid">

                    {technologies.map((technology) => (
                        <div
                            className="about-tech-card"
                            key={technology.name}
                        >

                            <div className="about-tech-icon">
                                {technology.icon}
                            </div>

                            <div>
                                <h3>
                                    {technology.name}
                                </h3>

                                <p>
                                    {technology.description}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>

            </section>


            {/* PROJECT PURPOSE */}
            <section className="about-purpose-section">

                <div className="about-purpose-content">

                    <div className="about-purpose-icon">
                        🌱
                    </div>

                    <div>

                        <p className="about-eyebrow">
                            OUR PURPOSE
                        </p>

                        <h2>
                            Making Weather Data More Useful
                        </h2>

                        <p>
                            Weather plays an important role in
                            agriculture. Changes in temperature,
                            rainfall, humidity, and wind conditions can
                            influence several farming activities.
                        </p>

                        <p>
                            Smart Weather is designed to convert
                            weather information into a simple,
                            understandable interface so that farmers can
                            quickly access information relevant to their
                            location.
                        </p>

                    </div>

                </div>

            </section>


            {/* DEVELOPER */}
            <section className="about-section developer-section">

                <div className="about-section-heading centered">

                    <div>
                        <p className="about-eyebrow">
                            PROJECT DEVELOPER
                        </p>

                        <h2>
                            Meet the Developer
                        </h2>
                    </div>

                </div>

                <div className="developer-card">

                    <div className="developer-avatar">
                        JS
                    </div>

                    <div className="developer-info">

                        <p className="developer-role">
                            👨‍💻 Developer & Project Creator
                        </p>

                        <h2>
                            Jaskirat Singh
                        </h2>

                        <p className="developer-degree">
                            B.Tech – Robotics & Artificial Intelligence
                        </p>

                        <p className="developer-college">
                            Chandigarh Engineering College, Jhanjeri
                        </p>

                        <p className="developer-description">
                            This project was designed and developed by
                            Jaskirat Singh as an academic project focused
                            on combining modern web technologies,
                            real-time weather information, and
                            data-driven agricultural support.
                        </p>

                        <div className="developer-tags">

                            <span>
                                React.js
                            </span>

                            <span>
                                Node.js
                            </span>

                            <span>
                                Express.js
                            </span>

                            <span>
                                MongoDB
                            </span>

                            <span>
                                AI / ML
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* FOOTER */}
            <section className="about-footer">

                <div className="about-footer-logo">
                    🌾
                </div>

                <h2>
                    KISAN SARTHAK -Smart Weather
                </h2>

                <p>
                    Weather intelligence for smarter farming.
                </p>

                <div className="about-footer-line"></div>

                <p className="about-footer-credit">
                    Designed & Developed by{" "}
                    <strong>
                        Jaskirat Singh
                    </strong>
                </p>

                <p className="about-footer-copy">
                    © {new Date().getFullYear()} Smart Weather.
                    All rights reserved.
                </p>

            </section>

        </div>
    );
}

export default About;