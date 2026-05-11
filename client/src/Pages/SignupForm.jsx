import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useSignupUserMutation } from "../redux/userSlice";

function SignupForm() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [signupUser, { isLoading }] = useSignupUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...signupInfo,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("details:", signupInfo);

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, Email and Password are required!!");
    }

    try {
      await signupUser(signupInfo).unwrap();
      handleSuccess("Signup successful!!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      if (err?.status === 400) {
        handleError("All fields are required!!");
      } else if (err?.status === 500) {
        handleError("Error in signing up!!");
      }
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

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
          {isLoading ? "Signing up..." : "Signup"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignupForm;
