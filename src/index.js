import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import BuildProgram from "./pages/BuildProgram";
import MyPrograms from "./pages/MyPrograms";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import VideoScreen from "./pages/VideoScreen";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/log-ind", element: <LogIn /> },
  { path: "/opret-bruger", element: <SignUp /> },
  { path: "/forside", element: <Home /> },
  { path: "/opsæt-mit-program", element: <BuildProgram /> },
  { path: "/mit-program", element: <MyPrograms /> },
  { path: "/om-os", element: <AboutUs /> },
  { path: "/indstillinger", element: <Settings /> },
  { path: "/afspil", element: <VideoScreen /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
