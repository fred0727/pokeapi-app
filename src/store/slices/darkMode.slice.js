import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("darkMode")) || Boolean(false),
  name: "darkMode",
  reducers: {
    setDarkMode: (state, action) => {
      localStorage.setItem("darkMode", action.payload);
      return action.payload;
    },
  },
});

export const {setDarkMode} = darkModeSlice.actions;

export default darkModeSlice.reducer
