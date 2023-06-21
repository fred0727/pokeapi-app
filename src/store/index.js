import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/nameTrainer.slice";
import darkMode from "./slices/darkMode.slice";

export default configureStore({
  reducer: {
    darkMode,
    nameTrainer,
  },
});
