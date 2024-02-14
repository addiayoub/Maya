import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import "./index.css";
import RouterProvider from "./Routes/RouterProvider";
import Chat from "./components/Test/Chat";
import { useDispatch } from "react-redux";
import { resetLoading } from "./redux/slices/ChatSlice";
import theme, { lightTheme } from "./utils/theme";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetLoading());
  }, [dispatch]);
  return (
    <ThemeProvider theme={lightTheme}>
      <RouterProvider />
    </ThemeProvider>
  );
}

export default App;
