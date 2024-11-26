import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignIn from "./SignIn";
import AllTasks from "./pages/AllTasks";
const Program = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/create-task" element={<App />} />
        <Route exact path="/all-tasks" element={<AllTasks />} />
        <Route exact path="/" element={<SignIn />} />
        {/* <Route exact path='/account/*' element={<AllTasks />}>
					<Route path='home' element={<Home />} />

					<Route path='buy' element={<Buy />} />
					<Route path='sell' element={<Sell />} />
					<Route path='account' element={<Account />} />
				</Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Program;
