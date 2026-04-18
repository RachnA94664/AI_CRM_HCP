import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatAssistant from "../components/common/ChatAssistant";
import { createInteraction } from "../services/api";

const LogHCPInteraction = () => {
  const interactionData = useSelector((state) => state.interaction);

  const [formData, setFormData] = useState({
    hcpName: "",
    interactionType: "",
    date: "",
    time: "",
    attendees: "",
    notes: "",
    sentiment: "",
    outcomes: "",
    followUps: "",
  });

  useEffect(() => {
    if (interactionData) {
      setFormData((prev) => ({
        ...prev,
        ...interactionData,
      }));
    }
  }, [interactionData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ ✅ NEW: API SUBMIT FUNCTION
  const handleSubmit = async () => {
    try {
      const payload = {
        hcp_name: formData.hcpName,
        interaction_type: formData.interactionType,
        notes: formData.notes,
        sentiment: formData.sentiment,
      };

      console.log("Sending:", payload);

      const response = await createInteraction(payload);

      console.log("Saved:", response.data);

      alert("✅ Interaction Saved Successfully");

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to save interaction");
    }
  };

  return (
    <div style={appContainer}>
      {/* LEFT PANEL */}
      <div style={leftPanel}>
        <h1 style={title}>Log HCP Interaction</h1>

        <div style={section}>
          <h3>Interaction Details</h3>

          <input
            name="hcpName"
            value={formData.hcpName}
            onChange={handleChange}
            placeholder="Search HCP Name..."
            style={input}
          />

          <select
            name="interactionType"
            value={formData.interactionType}
            onChange={handleChange}
            style={input}
          >
            <option value="">Interaction Type</option>
            <option value="Meeting">Meeting</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Event">Event</option>
          </select>

          <div style={row}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={input}
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={input}
            />
          </div>

          <input
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            placeholder="Add Attendees..."
            style={input}
          />
        </div>

        <div style={section}>
          <h3>Topics Discussed</h3>

          <div style={{ position: "relative" }}>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Write interaction details..."
              style={textarea}
            />
            <span style={micIcon}>🎤</span>
          </div>

          <button style={primaryButton}>
            ✨ Summarize from Voice Note
          </button>
        </div>

        <div style={section}>
          <h3>Materials Shared / Samples</h3>

          <div style={card}>
            <p>No materials added</p>
            <button style={secondaryButton}>Search/Add</button>
          </div>

          <div style={card}>
            <p>No samples added</p>
            <button style={secondaryButton}>Add Sample</button>
          </div>
        </div>

        <div style={section}>
          <h3>HCP Sentiment</h3>

          <div style={sentimentRow}>
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Positive"
                checked={formData.sentiment === "Positive"}
                onChange={handleChange}
              /> 😊 Positive
            </label>

            <label>
              <input
                type="radio"
                name="sentiment"
                value="Neutral"
                checked={formData.sentiment === "Neutral"}
                onChange={handleChange}
              /> 😐 Neutral
            </label>

            <label>
              <input
                type="radio"
                name="sentiment"
                value="Negative"
                checked={formData.sentiment === "Negative"}
                onChange={handleChange}
              /> 😞 Negative
            </label>
          </div>

          <textarea
            name="outcomes"
            value={formData.outcomes}
            onChange={handleChange}
            placeholder="Outcomes..."
            style={textareaSmall}
          />
        </div>

        <div style={section}>
          <h3>Follow-up Actions</h3>

          <textarea
            name="followUps"
            value={formData.followUps}
            onChange={handleChange}
            placeholder="Enter follow-ups..."
            style={textareaSmall}
          />
        </div>

        <div style={section}>
          <h3>AI Suggested Follow-ups</h3>

          <div style={aiCard}>
            <p>📅 Schedule follow-up meeting in 2 weeks</p>
            <p>📄 Send product brochure PDF</p>
          </div>
        </div>

        {/* ✅ NEW SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "12px",
            width: "100%",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🚀 Save Interaction
        </button>

      </div>

      {/* RIGHT PANEL */}
      <div style={rightPanel}>
        <ChatAssistant />
      </div>
    </div>
  );
};


/* STYLES SAME */

const appContainer = {
  display: "flex",
  height: "100vh",
  fontFamily: "Inter, sans-serif",
  background: "#f8fafc",
};

const leftPanel = {
  width: "70%",
  padding: "30px",
  overflowY: "auto",
};

const rightPanel = {
  width: "30%",
  borderLeft: "1px solid #e2e8f0",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
};

const title = { fontSize: "24px", marginBottom: "20px" };
const section = { marginBottom: "30px" };

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "10px",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
};

const textareaSmall = {
  width: "100%",
  height: "70px",
  padding: "10px",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  marginTop: "10px",
};

const row = { display: "flex", gap: "10px", marginTop: "10px" };

const primaryButton = {
  marginTop: "10px",
  padding: "10px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

const secondaryButton = {
  marginTop: "10px",
  padding: "8px",
  background: "#e2e8f0",
  border: "none",
  borderRadius: "6px",
};

const card = {
  background: "#fff",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "6px",
};

const sentimentRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const aiCard = {
  background: "#fff",
  padding: "15px",
  borderRadius: "6px",
};

const micIcon = {
  position: "absolute",
  right: "10px",
  bottom: "10px",
};

export default LogHCPInteraction;