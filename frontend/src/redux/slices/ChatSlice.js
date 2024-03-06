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
        "**Bonjour** à nouveau ! Si vous avez des questions concernant les marchés financiers, je suis là pour vous aider. **N'hésitez** pas à les poser.",
      // "Veuillez préciser davantage votre demande ou votre question afin que je puisse vous fournir une réponse plus appropriée et vous aider de manière plus efficace.",
      execution_time: 62,
      base64Image: null,
      likedByUser: 0,
    },
  },
];
const initialState = {
  userInput: "",
  chats: JSON.parse(localStorage.getItem("currentChats")) ?? [],
  // chats: initChats,
  currentChat: localStorage.getItem("currentChatId") ?? null,
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
    resetChatSlice: () => initialState,
    resetLastMsgId: (state) => {
      state.lastMsgId = null;
    },
    setUserInput: (state, { payload }) => {
      state.userInput = payload;
    },
    setChat: (state, { payload }) => {
      const { isUser } = payload;
      const msgCount = state.chats.length;
      const { chats } = current(state);
      if (isUser) {
        state.chats = [
          ...state.chats,
          {
            input: payload.input,
          },
        ];
      } else {
        const message = chats[chats.length - 1];
        const { output, isDeleted, _id } = payload;
        state.chats.pop();
        state.chats = [
          ...state.chats,
          {
            ...message,
            output,
            isDeleted,
            _id,
          },
        ];
        console.log("current message", message);
      }
      console.log("chats are payload", msgCount, chats.length, payload, chats);
      localStorage.setItem("currentChats", JSON.stringify(state.chats));
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
      }
      console.log("state.chats", chats, payload);
      localStorage.setItem("currentChats", JSON.stringify(state.chats));
    },
    setChats: (state, { payload }) => {
      state.chats = [...state.chats, ...payload];
    },
    resetLoading: (state) => {
      state.loading = false;
    },
    newChat: (state) => {
      state.chats = [];
      state.currentChat = null;
      localStorage.setItem("currentChats", JSON.stringify([]));
      localStorage.setItem("currentChatId", null);
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
      const msgIndex = chats.findIndex((msg) => msg._id === id);
      console.log("the message", chats[msgIndex], state.chats[msgIndex]);
      if (msgIndex !== -1) {
        // If chat is found, update the likedByUser property immutably
        state.chats[msgIndex] = {
          ...state.chats[msgIndex],
          output: {
            ...state.chats[msgIndex].output,
            likedByUser:
              state.chats[msgIndex].output.likedByUser === value ? 0 : value,
          },
        };
      }
      localStorage.setItem("currentChats", JSON.stringify(state.chats));
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
  resetChatSlice,
  editChatHistory,
} = chatSlice.actions;
export default chatSlice.reducer;
