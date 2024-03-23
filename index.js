const express = require("express");
const mongodb = require("./config/db");
const cors = require('cors')
const dotenv = require("dotenv");
const hostname = "localhost";
const veterinarioRoutes = require("./routers/veterinariosRoutes");
const pacientesRoutes = require("./routers/pacientesRouter");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
mongodb();

app.use("/api", veterinarioRoutes)
app.use("/api", pacientesRoutes)

const PORT = process.env.PORT || 2000;

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});
