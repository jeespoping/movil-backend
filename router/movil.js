const express = require("express");
const MovilController = require("../controller/movil");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/movil" });
const api = express.Router();

api.post("/movil", [md_auth.asureAuth, md_upload], MovilController.createMovil);
api.get("/movil", MovilController.getMoviles);
api.get("/movil/search", MovilController.getMovilSearch);
api.get("/movil/:url", MovilController.getMovil);
api.patch(
  "/movil/:id",
  [md_auth.asureAuth, md_upload],
  MovilController.updateMovil
);
api.delete("/movil/:id", [md_auth.asureAuth], MovilController.deleteMovil);

module.exports = api;
