import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { AxiosError } from "axios";
import { LoginData, ReturnLoginData } from "./types/useSliceTypes";

interface UserState {
  login: string | null;
  id: string | null;
  errorLogin: string | null;
}

const initialState: UserState = {
  login: null,
  id: null,
  errorLogin: null,
};

export const checkAuth = createAsyncThunk("/users/auth", async () => {
  const data = await userService.auth();

  return data;
});

export const loginUser = createAsyncThunk<
  ReturnLoginData,
  LoginData,
  {
    rejectValue: string;
  }
>("/users/login", async (req, { rejectWithValue }) => {
  const { login, password } = req;
  try {
    const data = await userService.login(login, password);

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    } else {
      return rejectWithValue("Unexpected Error");
    }
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    exitUser: (state) => {
      state.errorLogin = null;
      state.id = null;
      state.login = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      if (action.payload) {
        state.errorLogin = action.payload;
      }
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
