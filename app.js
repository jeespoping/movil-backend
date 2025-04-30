const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const API_VERSION = process.env.API_VERSION || "VP";

const app = express();

const authRoutes = require("./router/auth");
const movilRoute = require("./router/movil");

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, movilRoute);

module.exports = app;
