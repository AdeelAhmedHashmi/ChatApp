import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

interface UserState {
  isAuthenticated: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: () => {
      console.log("user login");
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
