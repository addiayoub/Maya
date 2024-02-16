import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

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
      formData.append("file", user.file);
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

export const upload = createAsyncThunk(
  "user/upload",
  async ({ file }, thunkAPI) => {
    try {
      const formData = new FormData();
      // formData.append("file", file);
      formData.append("name", "Yuns");
      console.log("file", file, formData);
      const response = await axiosClient.post(`/api/users/upload`, formData);
      console.log("response", response);
      return "data";
    } catch (error) {
      console.log("Upload error", error);
    }
  }
);
