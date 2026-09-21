import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setMessage("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!formData.email || !formData.password) {
            setError(
                "Please enter your email and password."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    formData
);

            const token = response.data.data.token;
            const user = response.data.data.user;

            // Store authentication data
            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            setMessage(
                "Login successful! Redirecting..."
            );

            setTimeout(() => {
                navigate("/");
            }, 800);

        } catch (error) {
            console.error(
                "Login error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">

            <section className="auth-card">

                <div className="auth-header">

                    <div className="auth-icon">
                        🌾
                    </div>

                    <p className="auth-eyebrow">
                        SMART FARMING ADVISOR
                    </p>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to access your
                        personalized farming dashboard.
                    </p>

                </div>


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="auth-form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />

                    </div>


                    <div className="auth-form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />

                    </div>


                    {message && (
                        <div className="auth-success">
                            ✅ {message}
                        </div>
                    )}


                    {error && (
                        <div className="auth-error">
                            ❌ {error}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "🔐 Login"}
                    </button>

                </form>


                <div className="auth-footer">

                    <p>
                        Don't have an account?
                    </p>

                    <Link to="/register">
                        Register here
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Login;