import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../Styles/MentalWellBeing.css";


// Component to conduct mental health assessment and track history
const MentalWellBeing = () => {
    const [step, setStep] = useState("start");
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]);

    // Get logged-in userId from localStorage
    const userId = localStorage.getItem("userId");

    // List of assessment questions
    const questions = [
        "How often do you feel overwhelmed by daily tasks?",
        "How frequently do you experience mood swings?",
        "How difficult is it for you to fall or stay asleep?",
        "How often do you feel hopeless about the future?",
        "How much trouble do you have concentrating?",
        "How often do you feel exhausted or low on energy?",
        "How frequently do you isolate yourself from others?",
        "How often do you feel worthless or inadequate?",
        "How much guilt do you feel over things you can't control?",
        "How frequently do you experience anxiety in daily situations?",
        "How often do you have persistent negative thoughts?",
        "How difficult is it for you to enjoy activities you once loved?",
        "How easily do you get frustrated or angry?",
        "How often do you experience unexplained physical discomfort (headaches, body pain)?",
        "How disconnected do you feel from yourself or reality?"
    ];

    // Store selected answer for each question
    const handleAnswer = (index, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [index]: parseInt(value),
        }));
    };

    // Calculate total score and save result to backend
    const calculateScore = async () => {

    // Ensure all questions are answered
    if (Object.keys(answers).length !== questions.length) {
        toast.warning("⚠️ Please answer all questions before submitting!");
        return;
    }

    const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
    setScore(totalScore);
    setStep("results");

    try {
        // Save assessment result to backend
        await axios.post("http://localhost:8080/api/assessment/save", {
            userId: userId,
            score: totalScore,
            date: new Date().toISOString()
        });

        fetchHistory(); // Refresh history after saving
    } catch (error) {
        console.error("Error saving assessment result:", error);
    }
};

    // Fetch past assessment history from backend
    const fetchHistory = async () => {
        if (!userId) return;

        try {
            const response = await axios.get(
                `http://localhost:8080/api/assessment/history?userId=${userId}`
            );
            setHistory(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    // Determine mental health status based on score
    const getMentalState = (score) => {
        const maxScore = questions.length * 4;
        const percentage = (score / maxScore) * 100;

        if (percentage < 25) return "😊 You seem to be doing well. Keep taking care of your mental health!";
        if (percentage < 50) return "🙂 You might be experiencing mild stress. Stay active, talk to a friend!";
        if (percentage < 75) return "😟 You may be facing moderate mental health challenges. Consider self-care or speaking to a counselor.";
        return "😔 It seems you're going through a tough time. Please seek professional help or talk to someone you trust.";
    };

    return (
        <div className="mental-wellbeing-container">
            {step === "start" && (
                <div className="assessment-box">
                    <h1>Assess Your Mental Well-being</h1>

                    {/* Start assessment */}
                    <button className="start-assessment" onClick={() => setStep("questions")}>
                        Start Your Assessment
                    </button>

                    {/* View past history */}
                    <button onClick={() => {
                        fetchHistory();
                        setStep("history");
                    }}>
                        View Test History
                    </button>
                </div>
            )}

            {step === "questions" && (
                <div className="assessment-box">
                    <h1>Answer the Questions</h1>

                    {questions.map((q, index) => (
                        <div key={index} className="question">
                            <p>{q}</p>

                            {/* Options for each question */}
                            <div className="radio-group">
                                {[1, 2, 3, 4].map((val) => (
                                    <label key={val} className="radio-label">
                                        <input
                                            type="radio"
                                            name={`q${index}`}
                                            value={val}
                                            onChange={(e) => handleAnswer(index, e.target.value)}
                                            required
                                        />
                                        <span className="radio-number">{val}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={calculateScore}>Submit Test</button>
                </div>
            )}

            {step === "results" && (
                <div className="assessment-box">
                    <h1>Test Results</h1>

                    <p>Score: {score} / {questions.length * 4}</p>

                    {/* Display mental health status */}
                    <div className="mental-state">
                        <strong>Your Mental Well-being Status:</strong><br />
                        {getMentalState(score)}
                    </div>

                    <button onClick={() => setStep("start")}>Retake Test</button>
                </div>
            )}

            {step === "history" && (
                <div className="assessment-box">
                    <h1>Test History</h1>

                    {history.length > 0 ? (
                        <ul className="history-list">
                            {history.map((item, index) => (
                                <li key={index}>
                                    <p><strong>Score:</strong> {item.score}</p>
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(item.date).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No test history available.</p>
                    )}

                    <button onClick={() => setStep("start")}>
                        Back to Start
                    </button>
                </div>
            )}
        </div>
    );
};

export default MentalWellBeing;