import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/chatSlice";
import { setInteractionData } from "../../redux/interactionSlice"; // ✅ FIX

const ChatAssistant = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // ✅ 1. Add user message
    dispatch(addMessage({ sender: "user", text: input }));

    const userInput = input;
    setInput("");

    // ✅ 2. Simulate AI processing
    setTimeout(() => {
      const userText = userInput.toLowerCase();

      let extractedData = {
        hcpName: "",
        interactionType: "",
        notes: userInput,
        sentiment: "",
      };

      // 🔥 1. Extract HCP Name (Improved)
      const nameMatch = userInput.match(/dr\.?\s+[a-z]+/i);
      if (nameMatch) {
        extractedData.hcpName = nameMatch[0];
      }

      // 🔥 2. Interaction Type Detection
      if (userText.includes("meeting")) {
        extractedData.interactionType = "Meeting";
      } else if (userText.includes("call")) {
        extractedData.interactionType = "Call";
      } else if (userText.includes("email")) {
        extractedData.interactionType = "Email";
      } else if (userText.includes("event")) {
        extractedData.interactionType = "Event";
      }

      // 🔥 3. Sentiment Detection
      if (
        userText.includes("good") ||
        userText.includes("positive") ||
        userText.includes("happy")
      ) {
        extractedData.sentiment = "Positive";
      } else if (
        userText.includes("bad") ||
        userText.includes("negative") ||
        userText.includes("angry")
      ) {
        extractedData.sentiment = "Negative";
      } else if (userText.includes("neutral")) {
        extractedData.sentiment = "Neutral";
      }

      // ✅ Fallback
      if (!extractedData.hcpName) {
        extractedData.hcpName = "Unknown Doctor";
      }

      if (!extractedData.interactionType) {
        extractedData.interactionType = "Meeting"; // default fallback
      }

      // ✅ 3. Add AI message (better UX)
      dispatch(
        addMessage({
          sender: "ai",
          text: `✅ Extracted:
Doctor: ${extractedData.hcpName}
Type: ${extractedData.interactionType}
Sentiment: ${extractedData.sentiment || "Not detected"}`,
        })
      );

      // ✅ 4. Sync to form
      dispatch(setInteractionData(extractedData));
    }, 800);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>AI Assistant</h2>

      {/* Chat Messages */}
      <div style={chatBoxStyle}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                ...messageStyle,
                backgroundColor:
                  msg.sender === "user" ? "#2563eb" : "#f1f5f9",
                color: msg.sender === "user" ? "#fff" : "#000",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={inputContainer}>
        <input
          type="text"
          placeholder="Type interaction details..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={inputStyle}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button onClick={handleSend} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
};

/* 🔥 STYLES (UNCHANGED) */

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const titleStyle = {
  marginBottom: "15px",
};

const chatBoxStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "15px",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  backgroundColor: "#f9fafb",
};

const messageStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  maxWidth: "70%",
  fontSize: "14px",
};

const inputContainer = {
  display: "flex",
  marginTop: "10px",
  gap: "10px",
};

const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

const buttonStyle = {
  padding: "10px 16px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ChatAssistant;