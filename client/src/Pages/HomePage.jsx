import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Paper from "../Components/PaperStyle";
import Filter from "../Components/Filter";
import { handleSuccess } from "../utils";

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedInUser");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    if (user) {
      setLoggedInUser(user);
    }

    const loginFlag = sessionStorage.getItem("loginSuccess");

    if (loginFlag === "true") {
      handleSuccess("Login successful!!");
      sessionStorage.removeItem("loginSuccess");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();

    handleSuccess("User Logged Out");

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 300);
  };

  return (
    <>
      <Navbar user={loggedInUser} onLogout={handleLogout} />
      <Sidebar />

      <Box
        sx={{
          ml: "260px",
          pt: "126px",
          minHeight: "100vh",
          backgroundColor: "#f5f7fb",
          overflowX: "hidden",
          pr: 2,
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 2,
            position: "fixed",
            top: "126px",
            left: "260px",
            right: "0",
            zIndex: 1000,
            backgroundColor: "#f5f7fb",
          }}
        >
          <Paper />
        </Box>

        <Box
          sx={{
            px: 2,
            pb: 4,
            mt: "280px",
          }}
        >
          <Filter />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
