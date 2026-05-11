import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { useLoginUserMutation } from "../redux/userSlice";

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginInfo).unwrap();

      const token = res?.jwtToken || res?.token;
      const userName = res?.name || res?.user?.name;
      const email = res?.email || res?.user?.email;

      if (!token) throw new Error("Token not received");

      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", userName || "");
      localStorage.setItem("email", email || "");

      handleSuccess("Login successful!!");

      setTimeout(() => {
        navigate("/home");
      }, 600);
    } catch (err) {
      if (err?.status === 401) {
        handleError("Invalid email or password!!");
      } else if (err?.status === 500) {
        handleError("Error in logging!!");
      } else if (err?.status === 400) {
        handleError("All fields are required!!");
      } else {
        handleError("Login failed!!");
      }
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
