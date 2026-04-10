import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resourceApi } from "../api/api";

function Play() {
    const { packId } = useParams();
    const navigate = useNavigate();

    const [puzzle, setPuzzle] = useState(null);
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(() => {
        return Number(localStorage.getItem("score")) || 0;
    });
    const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

    useEffect(() => {
        fetchPuzzle();
    }, [packId]);

    useEffect(() => {
        localStorage.setItem("score", score);
    }, [score]);

    const fetchPuzzle = async () => {
        try {
            const res = await resourceApi.get(`/Puzzles/next?packId=${packId}`);
            setPuzzle(res.data);
            setMessage("");
            setAnswer("");
            setIsCorrect(null);
            setAnsweredCorrectly(false);
        } catch (error) {
            console.log("PUZZLE LOAD ERROR:", error);
            setMessage("No puzzle found.");
        }
    };

    const handleSubmit = async () => {
        if (!answer.trim()) {
            setMessage("Please enter an answer.");
            setIsCorrect(false);
            return;
        }

        if (answeredCorrectly) {
            setMessage("You already solved this puzzle. Click Next Random Puzzle.");
            setIsCorrect(true);
            return;
        }

        try {
            const res = await resourceApi.post("/Game/submit", {
                puzzleId: puzzle.id,
                guess: answer
            });

            setMessage(res.data.message);
            setIsCorrect(res.data.correct);

            if (res.data.correct) {
                setScore((prev) => prev + res.data.scoreDelta);
                setAnsweredCorrectly(true);
            }
        } catch (error) {
            console.log("SUBMIT ERROR:", error);
            console.log("SUBMIT ERROR RESPONSE:", error.response);
            setMessage("Failed to submit answer.");
            setIsCorrect(false);
        }
    };

    if (!puzzle) {
        return <div style={{ padding: "30px" }}>Loading puzzle...</div>;
    }

    return (
        <div style={styles.container}>
            <h2>Guess the Word</h2>
            <p><strong>Score:</strong> {score}</p>

            <div style={styles.grid}>
                {puzzle.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Puzzle ${index}`}
                        style={styles.image}
                    />
                ))}
            </div>

            <p><strong>Hint:</strong> {puzzle.hint}</p>
            <p><strong>Difficulty:</strong> {puzzle.difficulty}</p>

            <input
                style={styles.input}
                placeholder="Type your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />

            <div style={styles.buttons}>
                <button style={styles.button} onClick={handleSubmit}>
                    Submit
                </button>

                <button style={styles.buttonSecondary} onClick={fetchPuzzle}>
                    Next Random Puzzle
                </button>

                <button style={styles.buttonBack} onClick={() => navigate("/packs")}>
                    Back to Packs
                </button>
            </div>

            {message && (
                <p
                    style={{
                        color:
                            isCorrect === true
                                ? "green"
                                : isCorrect === false
                                    ? "red"
                                    : "black",
                        marginTop: "15px",
                        fontWeight: "bold"
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "30px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 170px)",
        gap: "10px",
        marginBottom: "20px"
    },
    image: {
        width: "170px",
        height: "170px",
        objectFit: "cover",
        background: "#ddd"
    },
    input: {
        display: "block",
        width: "320px",
        padding: "10px",
        marginBottom: "15px"
    },
    buttons: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap"
    },
    button: {
        padding: "10px 15px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    },
    buttonSecondary: {
        padding: "10px 15px",
        background: "green",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    },
    buttonBack: {
        padding: "10px 15px",
        background: "gray",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    }
};

export default Play;