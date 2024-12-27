import { createSlice } from "@reduxjs/toolkit";
import { Subscriptions } from "./types/useSliceTypes";
import {
  checkAuth,
  createSubscription,
  deleteSubscription,
  getSubscriptionById,
  loginUser,
  registerUser,
} from "./reducers/userReducers";

interface UserState {
  login: string | null;
  id: string | null;
  errorLogin: string | null;
  subUserId: string | null;
  subscriptions: Subscriptions[] | [];
}

const initialState: UserState = {
  login: null,
  id: null,
  errorLogin: null,
  subUserId: null,
  subscriptions: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    exitUser: (state) => {
      state.errorLogin = null;
      state.id = null;
      state.login = null;
      state.subUserId = null;
      state.subscriptions = [];
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.subUserId = action.payload.subUserId;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      if (action.payload) {
        state.errorLogin = action.payload;
      }
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.subUserId = action.payload.subUserId;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.subUserId = action.payload.subUserId;
      state.login = action.payload.login;
    });
    builder.addCase(createSubscription.fulfilled, (state, action) => {
      console.log(action, "subs action");
      state.subscriptions = [...state.subscriptions, action.payload];
    });
    builder.addCase(getSubscriptionById.fulfilled, (state, action) => {
      state.subscriptions = action.payload;
      console.log("dfkldfldkfldklfkdkflk");
    });
    builder.addCase(deleteSubscription.fulfilled, (state, action) => {
      console.log("deleted");
      if (action.payload && state.subscriptions) {
        const newSubs = state.subscriptions.filter(
          (item) => item.userId != action.payload.userId
        );
        state.subscriptions = newSubs;
      }
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
