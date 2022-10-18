const express = require("express");
const { Me, login, logout } = require("../controllers/AuthController");

const route = express();

route.get("/me", Me);
route.post("/login", login);
route.delete("/logout", logout);

module.exports = route;
