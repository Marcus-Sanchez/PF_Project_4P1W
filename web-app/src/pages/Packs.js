import { useEffect, useState } from "react";
import { resourceApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Packs() {
    const [packs, setPacks] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                const res = await resourceApi.get("/Packs?random=true");
                setPacks(res.data);
            } catch (error) {
                setMessage("Failed to load packs.");
            }
        };

        fetchPacks();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <h2>Puzzle Packs</h2>
                <button style={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {message && <p>{message}</p>}

            {packs.length === 0 ? (
                <p>No packs available.</p>
            ) : (
                packs.map((pack) => (
                    <div key={pack.id} style={styles.card}>
                        <h3>{pack.name}</h3>
                        <p>{pack.description}</p>
                        <button
                            style={styles.playButton}
                            onClick={() => navigate(`/play/${pack.id}`)}
                        >
                            Play
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "30px"
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    card: {
        background: "#fff",
        padding: "20px",
        marginTop: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    playButton: {
        padding: "10px 15px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    },
    logoutButton: {
        padding: "10px 15px",
        background: "red",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    }
};

export default Packs;