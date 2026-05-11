const express = require("express");
const { signupUser, loginUser } = require("../Controller/UserController");
const route = new express.Router();

route.post("/signup", signupUser);
route.post("/login", loginUser);

module.exports = route;
