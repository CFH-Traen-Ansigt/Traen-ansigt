import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
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
import LogOut from "./pages/LogOut";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/log-ind", element: <LogIn /> },
  { path: "/opret-bruger", element: <SignUp /> },
  { path: "/forside", element: <ProtectedRoute><Home /></ProtectedRoute> },
  { path: "/opsæt-mit-program", element:  <ProtectedRoute><BuildProgram /></ProtectedRoute> },
  { path: "/mit-program", element:  <ProtectedRoute><MyPrograms /></ProtectedRoute> },
  { path: "/om-os", element:  <ProtectedRoute><AboutUs /></ProtectedRoute> },
  { path: "/indstillinger", element:  <ProtectedRoute><Settings /></ProtectedRoute> },
  { path: "/afspil", element:  <ProtectedRoute><VideoScreen /></ProtectedRoute> },
  { path: "/logout", element:  <ProtectedRoute><LogOut /></ProtectedRoute> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
