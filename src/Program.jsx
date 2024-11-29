import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";
import AllTasks from "./pages/AllTasks";
const Program = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/create-task" element={<App />} />
        <Route exact path="/all-tasks" element={<AllTasks />} />
        <Route exact path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Program;
