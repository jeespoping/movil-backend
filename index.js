const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const app = require("./app");

const PORT = process.env.POST || 3977;
const IP_SERVER = process.env.IP_SERVER || "localhost";
const API_VERSION = process.env.API_VERSION || "VP";

mongoose
  .connect(process.env.BBDD)
  .then(() => {
    app.listen(PORT, () => {
      console.log("############################");
      console.log("###### API REST MOVIL ######");
      console.log("############################");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((err) => console.error("Error de conexión a MongoDB:", err));
