import { createSlice, current } from "@reduxjs/toolkit";
import { getPrompts } from "../actions/PromptActions";
import { notyf } from "../../utils/notyf";
const initialState = {
  prompts: JSON.parse(localStorage.getItem("prompts")) ?? [],
  loading: false,
  error: null,
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    addPrompt: (state, { payload }) => {
      console.log("payload", payload);
      const { title, _id } = payload;
      const { prompts } = current(state);
      console.log("prompts before", prompts);
      const exists = prompts.find(
        (prompt) => prompt.title.toLowerCase() === title.toLowerCase()
      );
      if (!exists) {
        localStorage.setItem(
          "prompts",
          JSON.stringify([...state.prompts, { _id, title }])
        );
        state.prompts = [...state.prompts, { _id, title }];
      }
    },
    deletePrompt: (state, { payload }) => {
      const { id } = payload;
      const { prompts } = current(state);
      const filtered = prompts.filter((prompt) => prompt._id !== id);
      localStorage.setItem("prompts", JSON.stringify(filtered));
      state.prompts = filtered;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPrompts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrompts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.prompts = payload;
    });
    builder.addCase(getPrompts.rejected, (state, { payload }) => {
      state.loading = false;
      state.prompts = [];
      state.error = payload;
    });
  },
});
export const { addPrompt, deletePrompt } = promptSlice.actions;
export default promptSlice.reducer;
