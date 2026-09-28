import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!input.trim() || loading) {
      return;
    }

    const userMessage = input.trim();

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        throw new Error("Server error");
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the customer support server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Customer Support AI</h1>
        <p>How can we help you today?</p>
      </header>

      <main className="chat-container">
        <div className="chat-window">
          {messages.length === 0 ? (
            <div className="welcome">
              <h2> Welcome!</h2>
              <p>
                I'm your AI customer support assistant. Ask me anything.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}`}
              >
                <div className="message-label">
                  {message.role === "user" ? "You" : "Support AI"}
                </div>

                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="message assistant">
              <div className="message-label">Support AI</div>
              <div className="message-content">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <form className="input-box" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;