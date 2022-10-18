const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");

const route = express.Router();

route.get("/users", verifyUser, adminOnly, getUsers);
route.get("/users/:id", verifyUser, adminOnly, getUserById);
route.post("/users", verifyUser, adminOnly, createUser);
route.patch("/users/:id", verifyUser, adminOnly, updateUser);
route.delete("/users/:id", verifyUser, adminOnly, deleteUser);

module.exports = route;
