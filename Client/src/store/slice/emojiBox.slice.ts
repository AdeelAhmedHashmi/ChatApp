import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface EmojiState {
  currentEmoji: string | null;
  arrayOfEmojies: Array<string>;
  isFocus: boolean;
}

const initialState: EmojiState = {
  currentEmoji: null,
  arrayOfEmojies: [],
  isFocus: false,
};

const emojiSlice = createSlice({
  name: "emoji",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.currentEmoji = action.payload;
    },
    setEmojies: (state, action) => {
      state.arrayOfEmojies = action.payload;
    },
    isFocus: (state, action) => {
      state.isFocus = action.payload;
    },
  },
});

export const { setCurrent, setEmojies, isFocus } = emojiSlice.actions;

export const currentemoji = (state: RootState) =>
  state.emojiReducer.currentEmoji;
export const emojiList = (state: RootState) =>
  state.emojiReducer.arrayOfEmojies;
export const isEmojiBoxFocus = (state: RootState) => state.emojiReducer.isFocus;

export default emojiSlice.reducer;
