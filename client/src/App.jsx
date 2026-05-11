import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/LoginForm";
import Signup from "./Pages/SignupForm";
import Home from "./Pages/HomePage";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./Pages/Signup.css";
import "./Pages/Login.css";
import "./../src/index.css";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={800}
        limit={1}
        style={{ top: "52px" }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default App;
