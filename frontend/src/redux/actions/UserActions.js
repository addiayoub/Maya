import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/api/users/");
      console.log("Users", response.data);
      return response.data.users;
    } catch (error) {
      console.log("Error fetch users", error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

// Stats
export const getStats = createAsyncThunk(
  "user/getStats",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/api/users/stats");
      console.log("stats", response.data);
      return response.data.stats;
    } catch (error) {
      console.log("Error Get Stats", error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

// Config
export const getConfig = createAsyncThunk(
  "user/getConfig",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("/api/config");
      console.log("config", response.data);
      localStorage.setItem("apiAddress", response.data.apiAddress);
      return response.data.apiAddress;
    } catch (error) {
      console.log("Error Get Config", error);
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
export const setConfig = createAsyncThunk(
  "user/setConfig",
  async ({ apiAddress }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/api/config", { apiAddress });
      console.log("config", response.data);
      localStorage.setItem("apiAddress", response.data.apiAddress);
      return response.data;
    } catch (error) {
      console.log("Error Set Config", error);
      if (error?.response?.data?.message) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
      }
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user, thunkAPI) => {
    try {
      const response = await axiosClient.post("/api/users/", user);
      console.log("create user", response.data);
      return response.data;
    } catch (error) {
      console.log("error.message", error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await axiosClient.delete("/api/users/", {
        params: { id },
      });
      console.log("deleteUser", response.data);
      return response.data;
    } catch (error) {
      console.log("error.message", error);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, user }, thunkAPI) => {
    try {
      const { data } = await axiosClient.put(`/api/users/`, user, {
        params: { id },
      });
      console.log(`update action:`, data);
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);

export const storeMessage = async ({ userInput, aiResponse, chatId }) => {
  try {
    console.log("Call storeMessage", chatId);
    const response = await axiosClient.post(
      "/api/users/store_message",
      {
        userInput,
        aiResponse,
      },
      {
        params: {
          chatId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error storing message:", error);
  }
};

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ user }, thunkAPI) => {
    try {
      console.log("User is", user);
      let formData = new FormData();
      formData.append("image", user.pic);
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("passwordConfirmation", user.passwordConfirmation);
      const { data } = await axiosClient.post(
        `/api/users/update_profile`,
        formData
      );
      console.log(`update profile action:`, data);
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue({
          failed: true,
          message: error.message,
        });
      }
    }
  }
);
