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
