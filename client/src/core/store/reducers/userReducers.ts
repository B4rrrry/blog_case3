import { createAsyncThunk } from "@reduxjs/toolkit";
import subService from "../../services/subService";
import { AxiosError } from "axios";
import userService from "../../services/userService";
import { LoginData, ReturnLoginData } from "../types/useSliceTypes";

export const createSubscription = createAsyncThunk(
  "/subscriptions/create",
  async (data: { subUserId: string; userId: string }) => {
    try {
      const { subUserId, userId } = data;
      const newSubs = await subService.createSubscription(subUserId, userId);

      return newSubs;
    } catch (e) {
      return e;
    }
  }
);

export const deleteSubscription = createAsyncThunk<
  { userId: string },
  {
    userId: string;
  },
  {
    rejectValue: string;
  }
>(
  "/subscriptions/delete",
  async (data: { userId: string }, { rejectWithValue }) => {
    try {
      const { userId } = data;
      const newSubs = await subService.deleteSubscription(userId);
      console.log(newSubs, "delete status");
      return { userId };
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
  }
);

export const getSubscriptionById = createAsyncThunk(
  "/subscriptions/id",
  async (id: string) => {
    try {
      const subs = await subService.getSubscriptionsById(id);
      return subs;
    } catch (e) {
      return e;
    }
  }
);

export const checkAuth = createAsyncThunk("/users/auth", async () => {
  const data = await userService.auth();
  const subUser = await subService.getSubUserId(data.id);
  return { login: data.login, id: data.id, subUserId: subUser.id };
});

export const registerUser = createAsyncThunk<
  ReturnLoginData,
  {
    login: string;
    password: string;
    fName: string;
    sName: string;
    lName: string;
  },
  {
    rejectValue: string;
  }
>("users/register", async (data, { rejectWithValue }) => {
  try {
    const { login, password, fName, sName, lName } = data;
    let newSub;
    const newUser = await userService.register(
      login,
      password,
      fName,
      sName,
      lName
    );
    if (newUser) {
      console.log("new", newUser);
      newSub = await subService.createSubUser(newUser.id);
    }
    return { login: newUser.login, id: newUser.id, subUserId: newSub.id };
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
    console.log(data, "dsad");
    const subUser = await subService.getSubUserId(data.id);
    console.log(subUser, "sub");
    return { login: data.login, id: data.id, subUserId: subUser.id };
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
