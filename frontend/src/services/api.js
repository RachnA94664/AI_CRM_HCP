import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // your FastAPI backend
});

// 🔹 Create Interaction
export const createInteraction = (data) =>
  API.post("/interactions/", data);

// 🔹 Get All Interactions
export const getInteractions = () =>
  API.get("/interactions/");