import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                🌾 Smart Farming Advisor
            </div>

            <div className="navbar-links">

                <Link to="/">
                    🏠 Home
                </Link>

                <Link to="/">
                    🌦️ Weather
                </Link>

                <Link to="/farm-profile">
                    👨‍🌾 Farm Profile
                </Link>

                <Link to="/farming-history">
                    📋 Farming History
                </Link>

                <Link to="/fertilizer-advisor">
                    🧪 Fertilizer Advisor
                </Link>

                <Link to="/pest-disease-advisor">
                    🌿 Pest & Disease
                </Link>

                <Link to="/">
                    📋 Advisory
                </Link>

                <Link to="/">
                    ℹ️ About
                </Link>

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
                    <Link to="/login">
                        🔐 Login
                    </Link>
                )}

            </div>
        </nav>
    );
}

export default Navbar;