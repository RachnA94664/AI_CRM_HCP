import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInteractionData } from "../../redux/interactionSlice";

const InteractionForm = () => {
  const dispatch = useDispatch();

  const interactionData = useSelector((state) => state.interaction);

  const [formData, setFormData] = useState(interactionData);

  useEffect(() => {
    setFormData(interactionData);
  }, [interactionData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setInteractionData(formData));
    console.log("Saved:", formData);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Log Interaction</h2>

      <form onSubmit={handleSubmit}>

        {/* HCP Name */}
        <div style={fieldGroup}>
          <label style={labelStyle}>HCP Name</label>
          <input
            type="text"
            name="hcpName"
            placeholder="Enter doctor name"
            value={formData.hcpName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Interaction Type */}
        <div style={fieldGroup}>
          <label style={labelStyle}>Interaction Type</label>
          <select
            name="interactionType"
            value={formData.interactionType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select type</option>
            <option value="Meeting">Meeting</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
          </select>
        </div>

        {/* Notes */}
        <div style={fieldGroup}>
          <label style={labelStyle}>Notes</label>
          <textarea
            name="notes"
            placeholder="Write interaction details..."
            value={formData.notes}
            onChange={handleChange}
            style={{ ...inputStyle, height: "90px" }}
          />
        </div>

        {/* Sentiment */}
        <div style={fieldGroup}>
          <label style={labelStyle}>Sentiment</label>
          <select
            name="sentiment"
            value={formData.sentiment}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select sentiment</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>

        {/* Button */}
        <button type="submit" style={buttonStyle}>
          Save Interaction
        </button>

      </form>
    </div>
  );
};

/* 🔥 STYLES (industry clean look) */

const containerStyle = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const titleStyle = {
  marginBottom: "20px",
  fontWeight: "600",
};

const fieldGroup = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  marginTop: "10px",
};

export default InteractionForm;