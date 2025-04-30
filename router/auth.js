const express = require("express");
const AuthController = require("../controller/auth");

const api = express.Router();

api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);

module.exports = api;
