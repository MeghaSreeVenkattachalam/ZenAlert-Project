import React, { useState, useRef, useEffect } from "react";
import "../Styles/Chatbot.css";

// Chatbot component for handling user interaction and AI responses
const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Reference to scroll to the latest message
    const messagesEndRef = useRef(null);

    // Auto-scroll to latest message when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to send user message and get bot response
    const handleSendMessage = async () => {
        if (input.trim() === "" || loading) return;

        const userMessage = { text: input, sender: "user" };

        // Add user message and enable loading state
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            // Send message to backend API
            const response = await fetch("http://localhost:8080/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            // Get bot response
            const data = await response.text();

            const botReply = {
                text: data || "Hey… I'm here 💙",
                sender: "bot",
            };

            setMessages((prev) => [...prev, botReply]);

        } catch (error) {
            // Fallback message if API fails
            const botReply = {
                text: "Hey… I'm still here 💙 Try again in a moment 😅",
                sender: "bot",
            };

            setMessages((prev) => [...prev, botReply]);
        }

        setLoading(false);
    };

    return (
        <div className={`chatbot-container ${isOpen ? "open" : ""}`}>

            {/* Toggle chatbot open/close */}
            <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                💬
            </div>

            {/* Chat UI */}
            {isOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <span>AI Chatbot</span>
                    </div>

                    {/* Messages display */}
                    <div className="chatbox-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={msg.sender === "user" ? "user-message" : "bot-message"}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {/* Show typing indicator while loading */}
                        {loading && (
                            <div className="bot-message">
                                Typing... 💬
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input field */}
                    <div className="chatbox-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            disabled={loading}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSendMessage()
                            }
                        />
                    </div>

                    {/* Send button */}
                    <div className="chatbox-input">
                        <button onClick={handleSendMessage} disabled={loading}>
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;