import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utils/utils";

const initialState = {
  user: getLocalStorage("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserValue: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserValue } = authSlice.actions;

export default authSlice.reducer;
