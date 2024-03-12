import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { createApiConfig } from "../../api/api";
import { storeMessage } from "./UserActions";
import axiosClient from "../../api/axiosClient";

export const getData = createAsyncThunk(
  "chat/getData",
  async ({ message }, thunkAPI) => {
    const { currentChat } = thunkAPI.getState().chat;
    const { prevMessages } = thunkAPI.getState().chat;
    const chatslice = thunkAPI.getState().chat;
    const API = createApiConfig();
    console.log("chatslice", chatslice);
    try {
      const response = await API.post(`POST/get_data/`, prevMessages, {
        params: {
          user_input: message,
        },
      });
      console.log("response.data", response.data);
      const result = {
        isUser: false,
        isDeleted: false,
        output: {
          content: response.data.message,
          execution_time: response.data.execution_time_seconds,
          base64Image: response.data.image_data ?? null,
          chartData: response.data.csv_data,
          chartType: response.data.visualization_type,
          likedByUser: 0,
        },
        prevMessages: {
          messages: response.data.messages,
          messages_categorie: response.data.messages_categorie,
        },
      };
      const { msgId } = await storeMessage({
        userInput: message,
        aiResponse: response.data,
        chatId: currentChat,
      });
      result._id = msgId;
      console.log("storedMsg", msgId, result);
      return result;
    } catch (error) {
      console.log("ChatActions error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(`/chats/`);
      console.log("getChats", response.data);
      localStorage.setItem("chats", JSON.stringify(response.data.chats));
      return response.data;
    } catch (error) {
      console.log("getChats error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async ({ title }, thunkAPI) => {
    try {
      const response = await axiosClient.post(`/chats/`, {
        title,
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("ChatActions error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async ({ id }, thunkAPI) => {
    console.log("id", id);
    try {
      const response = await axiosClient.delete(`/chats/`, {
        params: {
          id,
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("ChatActions error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getChat = createAsyncThunk(
  "chat/getChat",
  async ({ id }, thunkAPI) => {
    console.log("id", id);
    try {
      const response = await axiosClient.get(`/chats/show`, {
        params: {
          id,
        },
      });
      console.log("getChat response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("ChatActions error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editChat = createAsyncThunk(
  "chat/editChat",
  async ({ id, newTitle }, thunkAPI) => {
    console.log("id", id, newTitle);
    try {
      const response = await axiosClient.put(`/chats/edit`, {
        id,
        newTitle,
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("ChatActions error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const likeDislikeChat = createAsyncThunk(
  "chat/likeDislikeChat",
  async ({ msgId, value }, thunkAPI) => {
    const { currentChat } = thunkAPI.getState().chat;
    try {
      console.log("likeDislikeChat action", currentChat);
      const response = await axiosClient.post("/chats/like_dislike", {
        chatId: currentChat,
        msgId,
        value,
      });
      console.log("likeDislikeChat response", response.data);
      return response.data;
    } catch (error) {
      console.log("ChatActions error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMsg = createAsyncThunk(
  "chat/deleteMsg",
  async ({ msgId }, thunkAPI) => {
    console.log("deleteMsg msgId");
    const { currentChat } = thunkAPI.getState().chat;
    try {
      const response = await axiosClient.delete(`/chats/delete_message`, {
        params: {
          chatId: currentChat,
          msgId,
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("ChatActions error", error);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);
