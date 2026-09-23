import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setMenuOpen(false);
        navigate("/login");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            {/* APP TITLE */}
            <div className="navbar-brand">
                <div className="navbar-logo">
                    🌾 KISAN SARTHAK: Smart Weather
                </div>

                <div className="navbar-subtitle">
                    Weather-Based Farming Advisor
                </div>
            </div>


            {/* MOBILE MENU BUTTON */}
            <button
                type="button"
                className="navbar-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? "✕" : "☰"}
            </button>


            {/* NAVIGATION LINKS */}
            <div
                className={`navbar-links ${
                    menuOpen ? "navbar-links-open" : ""
                }`}
            >

                <Link to="/" onClick={closeMenu}>
                    🏠 Home
                </Link>

                <Link to="/weather" onClick={closeMenu}>
                    🌦️ Weather
                </Link>

                <Link to="/farm-profile" onClick={closeMenu}>
                    👨‍🌾 Farm Profile
                </Link>

                <Link to="/farming-history" onClick={closeMenu}>
                    📋 Farming History
                </Link>

                <Link to="/fertilizer-advisor" onClick={closeMenu}>
                    🧪 Fertilizer Advisor
                </Link>

                <Link to="/pest-disease-advisor" onClick={closeMenu}>
                    🌿 Pest & Disease
                </Link>

                <Link to="/" onClick={closeMenu}>
                    📋 Advisory
                </Link>

                <Link to="/" onClick={closeMenu}>
                    ℹ️ About
                </Link>


                {/* USER */}
                {token ? (
                    <div className="navbar-user-section">

                        <span className="navbar-user">
                            👤 {user?.name || "Farmer"}
                        </span>

                        <button
                            type="button"
                            className="navbar-logout-button"
                            onClick={handleLogout}
                        >
                            🚪 Logout
                        </button>

                    </div>
                ) : (
                    <Link to="/login" onClick={closeMenu}>
                        🔐 Login
                    </Link>
                )}

            </div>

        </nav>
    );
}

export default Navbar;