import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isAuth = false;
    },
    changeAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});
