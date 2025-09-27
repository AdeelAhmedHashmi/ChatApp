import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import emojiReducer from "./slice/emojiBox.slice";
import userReducer from "./slice/user/user.slice";

const store = configureStore({
  reducer: {
    emojiReducer: emojiReducer,
    userReducer: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
