import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  path: window.location.pathname.split("/")[1],
  lang: localStorage.getItem("lang") ?? "fr",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isOpen = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
  },
});

export const { toggleSidebar, setPath, setLang } = layoutSlice.actions;
export default layoutSlice.reducer;
