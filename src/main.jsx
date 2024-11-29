import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Program from "./Program.jsx";
import { TaskProvider } from "./Context/TaskContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <Toaster />
      <TaskProvider>
        <Program />
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
);
