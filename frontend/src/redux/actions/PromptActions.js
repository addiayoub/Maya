import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const getPrompts = createAsyncThunk(
  "prompt/getPrompts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/api/prompts/");
      console.log("Prompts", response.data);
      localStorage.setItem("prompts", JSON.stringify(response.data.prompts));
      return response.data.prompts;
    } catch (error) {
      console.log("Error fetch prompts", error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

export const setPrompt = createAsyncThunk(
  "prompt/setPrompt",
  async ({ title }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/api/prompts/", { title });
      console.log("setPrompt Response", response.data);
      return response.data;
    } catch (error) {
      console.log("Error setPrompt prompts", error);
      if (error?.response?.data?.message) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

export const deletePrompt = createAsyncThunk(
  "prompt/deletePrompt",
  async ({ id }, thunkAPI) => {
    try {
      const response = await axiosClient.delete("/api/prompts/", {
        params: { id },
      });
      console.log("deletePrompt Response", response.data);
      return response.data;
    } catch (error) {
      console.log("Error deletePrompt prompts", error);
      if (error?.response?.data?.message) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
