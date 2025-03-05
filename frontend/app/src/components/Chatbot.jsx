import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Import the CSS file

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:4000/api/chatbot", { message: input });
            const botMessage = { role: "bot", content: res.data.response };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages((prev) => [...prev, { role: "bot", content: "Error fetching response." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat">I'm Here To Help U !!</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index} className={`message ${msg.role}`}>
                        <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
                    </p>
                ))}
                {loading && <p className="message bot"><strong>Bot:</strong> Typing...</p>}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
