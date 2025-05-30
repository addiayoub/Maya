import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axiosClient.post(`/api/auth/login`, user);
    const data = await response.data;
    const configResp = await axiosClient.get("/api/config/");
    const { apiAddress } = configResp.data;
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("apiAddress", apiAddress);
    console.log("apiAddress", localStorage.getItem("apiAddress"));
    return { data };
  } catch (error) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
