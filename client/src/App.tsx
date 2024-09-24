import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import "./styles/app.scss";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./core/store/store";
import { checkAuth } from "./core/store/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
