import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserSlice {
  user: User;
}
const id = localStorage.getItem("id") || "";
const email = localStorage.getItem("email") || "";
const token = localStorage.getItem("token") || "";

const userInitial: UserSlice = {
  user: {
    id: id,
    email: email,
    token: token,
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState: userInitial,
  reducers: {
    loginUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logoutUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
