import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import "./styles/app.scss";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./core/store/store";
import {
  checkAuth,
  getSubscriptionById,
} from "./core/store/reducers/userReducers";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((s: RootState) => s.userSlice);
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  useEffect(() => {
    if (selector.subUserId) {
      dispatch(getSubscriptionById(selector.subUserId));
    }
  }, [selector.subUserId]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
