import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hcpName: "",
  interactionType: "",
  date: "",
  time: "",
  attendees: "",
  notes: "",
  sentiment: "",
  outcomes: "",
  followUps: "",
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    setInteractionData: (state, action) => {
      return { ...state, ...action.payload };
    },

    clearInteraction: () => initialState,
  },
});

export const { setInteractionData, clearInteraction } =
  interactionSlice.actions;

export default interactionSlice.reducer;