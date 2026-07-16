import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "../../styles/login.css";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { user, login: loginUser } = useAuth();

    useEffect(() => {

        if (!user?.token) return;

        switch (user.role) {

            case "SUPER_ADMIN":
                navigate("/superadmin/dashboard");
                break;

            case "COLLEGE_ADMIN":
                navigate("/admin/dashboard");
                break;

            case "FACULTY":
                navigate("/faculty/dashboard");
                break;

            case "STUDENT":
                navigate("/student/dashboard");
                break;

            default:
                break;
        }

    }, [user, navigate]);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await login({

                email,
                password

            });

            loginUser(response);

            switch (response.role) {

                case "SUPER_ADMIN":
                    navigate("/superadmin/dashboard");
                    break;

                case "COLLEGE_ADMIN":
                    navigate("/admin/dashboard");
                    break;

                case "FACULTY":
                    navigate("/faculty/dashboard");
                    break;

                case "STUDENT":
                    navigate("/student/dashboard");
                    break;

                default:
                    alert("Unknown User Role");
            }

        } catch (error) {

            console.error(error);

            alert("Invalid Email or Password");

        }

    };

    return (

        <div className="login-container">

            <div className="login-shell">

                <aside className="hero-panel">

                    <div className="hero-mark">CampusGPT</div>
                    <p className="hero-kicker">AI-powered campus command center</p>
                    <h1>Make every campus question feel effortless.</h1>
                    <p className="hero-copy">
                        Students and staff get instant answers, documents, and updates without digging through scattered portals.
                    </p>

                    <div className="hero-stats">
                        <div className="stat-card">
                            <strong>24/7</strong>
                            <span>Always available</span>
                        </div>
                        <div className="stat-card">
                            <strong>100%</strong>
                            <span>Context-aware</span>
                        </div>
                    </div>

                    <div className="hero-preview">
                        <div className="preview-chip">Admissions • today</div>
                        <div className="preview-bubble">
                            <span className="preview-label">Ask the assistant</span>
                            <p>“When is the last date to submit my transcripts?”</p>
                        </div>
                    </div>

                </aside>

                <section className="login-card">

                    <p className="login-eyebrow">Secure access</p>
                    <h2>Welcome back</h2>
                    <p className="login-subtitle">Sign in to continue your campus workspace.</p>

                    <form onSubmit={handleLogin}>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">
                            Login
                        </button>

                    </form>

                </section>

            </div>

        </div>

    );

}

export default LoginPage;