import { createSlice, current } from "@reduxjs/toolkit";
import {
  getConfig,
  getStats,
  getUsers,
  setConfig,
} from "../actions/UserActions";
const initialState = {
  users: {
    data: [],
    loading: false,
    error: null,
  },
  stats: {
    data: [],
    loading: false,
    error: null,
  },
  config: {
    apiAddress: localStorage.getItem("apiAddress") ?? "",
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      const {
        users: { data },
      } = current(state);
      state.users.data = [payload, ...data];
    },
    deleteUser: (state, { payload }) => {
      const {
        users: { data },
      } = current(state);
      const newUsers = data.filter((item) => item._id !== payload);
      console.log("newUser", newUsers);
      state.users.data = newUsers;
    },
    updateUser: (state, { payload }) => {
      console.log("update payload", payload);
      const { id, username, isAdmin } = payload;
      state.users.data = state.users.data.map((item) =>
        item._id === id ? { ...item, _id: id, username, isAdmin } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, ({ users }) => {
      users.loading = true;
    });

    builder.addCase(getUsers.fulfilled, ({ users }, { payload }) => {
      users.loading = false;
      users.data = payload;
    });

    builder.addCase(getUsers.rejected, ({ users }, { payload }) => {
      users.loading = false;
      users = { ...initialState.users, error: payload };
    });

    // Get Stats
    builder.addCase(getStats.pending, ({ stats }) => {
      stats.loading = true;
    });

    builder.addCase(getStats.fulfilled, ({ stats }, { payload }) => {
      stats.loading = false;
      stats.data = payload;
    });

    builder.addCase(getStats.rejected, ({ stats }, { payload }) => {
      stats = initialState.stats;
      stats.error = payload;
    });

    // Get Config
    builder.addCase(getConfig.pending, ({ config }) => {
      config.loading = true;
    });

    builder.addCase(getConfig.fulfilled, ({ config }, { payload }) => {
      config.loading = false;
      config.apiAddress = payload;
    });

    builder.addCase(getConfig.rejected, ({ config }, { payload }) => {
      config = initialState.config;
      config.error = payload;
    });
    // Set Config
    builder.addCase(setConfig.pending, ({ config }) => {
      config.loading = true;
    });

    builder.addCase(setConfig.fulfilled, ({ config }, { payload }) => {
      config.loading = false;
      config.apiAddress = payload.apiAddress;
    });

    builder.addCase(setConfig.rejected, ({ config }, { payload }) => {
      config = initialState.config;
      config.error = payload;
    });
  },
});

export default userSlice.reducer;
export const { addUser, deleteUser, updateUser } = userSlice.actions;
