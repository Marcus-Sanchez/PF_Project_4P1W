import { useState } from "react";
import { authApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await authApi.post("/Auth/login", {
                email,
                password
            });

            login(res.data.token);
            setMessage("Login successful.");
            navigate("/packs");
        } catch (error) {
          
                console.log("LOGIN ERROR:", error);
                console.log("LOGIN ERROR RESPONSE:", error.response);
                console.log("LOGIN ERROR DATA:", error.response?.data);
                setMessage("Login failed. Check console.");
            }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Login</h2>

                <input
                    style={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={styles.button} onClick={handleLogin}>
                    Login
                </button>

                {message && <p>{message}</p>}

                <p>
                    No account yet? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    },
    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        width: "350px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px"
    },
    button: {
        width: "100%",
        padding: "10px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    }
};

export default Login;