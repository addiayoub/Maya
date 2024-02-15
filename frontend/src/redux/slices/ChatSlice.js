import { createSlice, current } from "@reduxjs/toolkit";
import { getChat, getData } from "../actions/ChatActions";
const initChats = [
  {
    isUser: true,
    data: {
      content: "salam",
    },
  },
  {
    isUser: false,
    data: {
      content:
        "Bonjour à nouveau ! Si vous avez des questions concernant les marchés financiers, je suis là pour vous aider. N'hésitez pas à les poser.",
      // "Veuillez préciser davantage votre demande ou votre question afin que je puisse vous fournir une réponse plus appropriée et vous aider de manière plus efficace.",
      execution_time: 62,
      base64Image: null,
      likedByUser: 0,
    },
  },
];
const initialState = {
  userInput: "",
  chats: [],
  currentChat: null,
  chatsHistory: JSON.parse(localStorage.getItem("chats")) ?? [],
  data: [],
  getChatLoading: false,
  loading: false,
  error: null,
  lastMsgId: null,
  prevMessages: {
    messages: [],
    messages_categorie: [],
  },
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetLastMsgId: (state) => {
      state.lastMsgId = null;
    },
    setUserInput: (state, { payload }) => {
      state.userInput = payload;
    },
    setChat: (state, { payload }) => {
      state.chats = [...state.chats, payload];
    },
    deleteChat: (state, { payload }) => {
      const { chats } = current(state);
      const messageIndex = chats.findIndex(
        (message) => message._id === payload
      );
      console.log("message index", messageIndex);
      if (messageIndex !== -1) {
        // Delete the current message

        state.chats.splice(messageIndex, 1);

        // Check if there is a preceding message
        if (messageIndex > 0) {
          // Delete the preceding message

          state.chats.splice(messageIndex - 1, 1);
        }
      }
      console.log("state.chats", chats, payload);
      // state.chats = [...state.chats, payload];
    },
    setChats: (state, { payload }) => {
      state.chats = [...state.chats, ...payload];
    },
    resetLoading: (state) => {
      state.loading = false;
    },
    newChat: (state) => {
      state.chats = [];
    },
    setCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },
    setChatsHistory: (state, { payload }) => {
      const history = [...payload, ...state.chatsHistory];
      state.chatsHistory = history;
    },
    editChatHistory: (state, { payload }) => {
      const { id, newTitle } = payload;
      state.chatsHistory = state.chatsHistory.map((chat) =>
        chat._id === id ? { ...chat, title: newTitle } : chat
      );
    },
    clearChatsHistory: (state) => {
      state.chatsHistory = [];
    },
    handleLikeDislike: (state, { payload }) => {
      console.log("handleLikeDislike", payload);
      const { id, value } = payload;
      const { chats } = current(state);
      const chatIndex = chats.findIndex((item) => item._id === id);

      if (chatIndex !== -1) {
        // If chat is found, update the likedByUser property immutably
        state.chats[chatIndex] = {
          ...state.chats[chatIndex],
          data: {
            ...state.chats[chatIndex].data,
            likedByUser:
              state.chats[chatIndex].data.likedByUser === value ? 0 : value,
          },
        };
      }
    },
    setChatsHistory2: (state, { payload }) => {
      const history = [...payload, ...state.chatsHistory];
      state.chatsHistory = payload;
    },
    deleteChatHistory: (state, { payload }) => {
      const { chatsHistory } = current(state);
      console.log("current history", chatsHistory, payload);
      const history = chatsHistory.filter((chat) => chat._id !== payload);
      state.chatsHistory = history;
      console.log("current history after", chatsHistory, history);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = [...state.data, payload];
      state.lastMsgId = payload._id;
      state.prevMessages = payload.prevMessages;
    });
    builder.addCase(getData.rejected, (state, payload) => {
      state.loading = false;
      state.data = [];
      state.error = payload;
    });

    builder.addCase(getChat.pending, (state) => {
      state.getChatLoading = true;
    });
    builder.addCase(getChat.fulfilled, (state) => {
      state.getChatLoading = false;
    });
    builder.addCase(getChat.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setUserInput,
  setChat,
  setChats,
  resetLoading,
  setChatsHistory,
  newChat,
  setChatsHistory2,
  deleteChatHistory,
  setCurrentChat,
  clearChatsHistory,
  handleLikeDislike,
  deleteChat,
  resetLastMsgId,
  editChatHistory,
} = chatSlice.actions;
export default chatSlice.reducer;
