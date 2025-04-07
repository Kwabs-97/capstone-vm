import { RootState } from "./store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatbotDataInterface {
  chatbotName: string;
  chatbotWelcomeMessage: string;
  files?: string[];
}

const initialState: ChatbotDataInterface = {
  chatbotName: "",
  chatbotWelcomeMessage: "",
  files: [],
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setChatbotName: (state, action: PayloadAction<string>) => {
      state.chatbotName = action.payload;
    },
    setChatbotWelcomeMessage: (state, action: PayloadAction<string>) => {
      state.chatbotWelcomeMessage = action.payload;
    },
    setFiles: (state, action: PayloadAction<string[]>) => {
      state.files = action.payload;
    },
  },
});

export const { setChatbotName, setChatbotWelcomeMessage, setFiles } =
  detailsSlice.actions;

export default detailsSlice.reducer;
export const selectChatbotName = (state: RootState) =>
  state.details.chatbotName;
export const selectChatbotWelcomeMessage = (state: RootState) =>
  state.details.chatbotWelcomeMessage;
export const selectFiles = (state: RootState) => state.details.files;
