import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AIChat() {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Hello! 👋 I'm your AI Farming Assistant. Ask me anything about your crop, weather, irrigation, or farming activities."
        }
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const quickQuestions = [
        "Should I irrigate today?",
        "Is the current weather risky for my crop?",
        "What should I do at my current growth stage?",
        "What does my weather forecast suggest?"
    ];

    const sendMessage = async (messageText = input) => {
        const question = messageText.trim();

        if (!question || loading) {
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setMessages((previous) => [
                ...previous,
                {
                    role: "user",
                    text: question
                },
                {
                    role: "assistant",
                    text: "Please login first to use the personalized AI Farming Assistant. 🔐"
                }
            ]);

            setInput("");
            return;
        }

        setMessages((previous) => [
            ...previous,
            {
                role: "user",
                text: question
            }
        ]);

        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/ai/chat",
                {
                    message: question
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const aiMessage =
                response.data?.message ||
                "I couldn't generate a response right now.";

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    text: aiMessage
                }
            ]);

        } catch (error) {
            console.error("AI Chat Error:", error);

            let errorMessage =
                "Sorry, I couldn't process your question right now. Please try again.";

            if (error.response?.status === 401) {
                errorMessage =
                    "Your login session has expired. Please login again. 🔐";
            }

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    text: errorMessage
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage();
    };

    const handleQuickQuestion = (question) => {
        sendMessage(question);
    };

    return (
        <>
            {/* Floating AI Button */}

            <button
                type="button"
                className={`ai-chat-button ${
                    isOpen ? "ai-chat-button-open" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open AI Farming Assistant"
            >
                {isOpen ? "✕" : "🤖"}

                {!isOpen && (
                    <span className="ai-chat-button-label">
                        AI Assistant
                    </span>
                )}
            </button>


            {/* Chat Window */}

            {isOpen && (
                <section className="ai-chat-window">

                    {/* Header */}

                    <header className="ai-chat-header">

                        <div className="ai-chat-header-info">

                            <div className="ai-chat-avatar">
                                🌾
                            </div>

                            <div>
                                <h3>
                                    AI Farming Assistant
                                </h3>

                                <span>
                                    <span className="ai-online-dot"></span>
                                    Online
                                </span>
                            </div>

                        </div>

                        <button
                            type="button"
                            className="ai-chat-close"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close AI Assistant"
                        >
                            ✕
                        </button>

                    </header>


                    {/* Messages */}

                    <div className="ai-chat-messages">

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`ai-message-row ${
                                    message.role === "user"
                                        ? "user-message-row"
                                        : "assistant-message-row"
                                }`}
                            >

                                {message.role === "assistant" && (
                                    <div className="ai-message-avatar">
                                        🌾
                                    </div>
                                )}

                                <div
                                    className={`ai-message ${
                                        message.role === "user"
                                            ? "user-message"
                                            : "assistant-message"
                                    }`}
                                >

                                    {message.role === "assistant" ? (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {message.text}
                                        </ReactMarkdown>
                                    ) : (
                                        message.text
                                    )}

                                </div>

                            </div>
                        ))}


                        {/* Loading */}

                        {loading && (
                            <div className="ai-message-row assistant-message-row">

                                <div className="ai-message-avatar">
                                    🌾
                                </div>

                                <div className="ai-message assistant-message ai-typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                            </div>
                        )}

                    </div>


                    {/* Quick Questions */}

                    {messages.length === 1 && !loading && (
                        <div className="ai-quick-questions">

                            <p>
                                Quick questions
                            </p>

                            <div className="ai-quick-list">

                                {quickQuestions.map((question) => (
                                    <button
                                        type="button"
                                        key={question}
                                        onClick={() =>
                                            handleQuickQuestion(question)
                                        }
                                    >
                                        {question}
                                    </button>
                                ))}

                            </div>

                        </div>
                    )}


                    {/* Input */}

                    <form
                        className="ai-chat-input-area"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            value={input}
                            onChange={(event) =>
                                setInput(event.target.value)
                            }
                            placeholder="Ask about your farm..."
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            aria-label="Send message"
                        >
                            ➤
                        </button>

                    </form>

                </section>
            )}
        </>
    );
}

export default AIChat;