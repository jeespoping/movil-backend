const express = require("express");
const MovilController = require("../controller/movil");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({ uploadDir: "./uploads/movil" });
const api = express.Router();

api.post("/movil", [md_upload], MovilController.createMovil);
api.get("/movil", MovilController.getMoviles);
api.get("/movil/:url", MovilController.getMovil);
api.patch("/movil/:id", [md_upload], MovilController.updateMovil);
api.delete("/movil/:id", MovilController.deleteMovil);

module.exports = api;
