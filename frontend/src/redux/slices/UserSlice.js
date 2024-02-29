import { createSlice, current } from "@reduxjs/toolkit";
import { getUsers } from "../actions/UserActions";
const initialState = {
  users: {
    data: [],
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
      users = initialState.users;
      users.error = payload;
    });
  },
});

export default userSlice.reducer;
export const { addUser, deleteUser, updateUser } = userSlice.actions;
