import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  path: window.location.pathname.split("/")[1],
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
  },
});

export const { toggleSidebar, setPath } = layoutSlice.actions;
export default layoutSlice.reducer;
