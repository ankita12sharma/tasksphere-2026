const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTasksByFilter,
} = require("../Controller/TaskController");
const route = new express.Router();

route.post("/createtask", createTask);
route.get("/gettasks", getTasks);
route.put(`/edittask/:id`, updateTask);
route.delete(`/deltask/:id`, deleteTask);
route.get("/filter", getTasksByFilter);

module.exports = route;
