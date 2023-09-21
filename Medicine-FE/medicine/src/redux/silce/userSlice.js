import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    username: "",
    role: "",
    accessToken: "",
  },
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserLoginSuccess: (state, action) => {
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
      };
      state.isAuthenticated = true;
    },

    removeDataUserLogout: (state) => {
      state.user = {
        ...initialState.user,
      };
      state.isAuthenticated = initialState.isAuthenticated;
    },
  },
});

export const { fetchUserLoginSuccess, removeDataUserLogout } =
  userSlice.actions;

export default userSlice.reducer;
