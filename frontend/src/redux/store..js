import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ChatReducer from "./slices/ChatSlice";
import AuthReducer from "./slices/AuthSlice";
import LayoutReducer from "./slices/LayoutSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authMiddleware from "./middleware/AuthMiddleware";
import UserReducer from "./slices/UserSlice";
import PromptReducer from "./slices/PromptSlice";

// const chatsPersistConfig = {
//   key: "chats",
//   storage,
// };

// const rootReducer = combineReducers({
//   auth: AuthReducer,
//   chat: persistReducer(chatsPersistConfig, ChatReducer),
// });

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  chat: ChatReducer,
  layout: LayoutReducer,
  user: UserReducer,
  prompt: PromptReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});

export const persistor = persistStore(store);
