import { useState } from "react";
import { authApi } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await authApi.post("/Auth/register", {
                email,
                password
            });

            setMessage("Registration successful. You can now log in.");
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            setMessage("Registration failed. Email may already exist.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Register</h2>

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

                <button style={styles.button} onClick={handleRegister}>
                    Register
                </button>

                {message && <p>{message}</p>}

                <p>
                    Already have an account? <Link to="/">Login here</Link>
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
        background: "green",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    }
};

export default Register;