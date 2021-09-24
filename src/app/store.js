import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/userSlice";
import chatReducer from "../components/chatSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
