const express = require("express");
const mongodb = require("./config/db");
const cors = require('cors')
const dotenv = require("dotenv");
const hostname = "localhost";
const veterinarioRoutes = require("./routers/veterinariosRoutes");
const pacientesRoutes = require("./routers/pacientesRoutes")


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
mongodb();

app.use("/api", veterinarioRoutes)
app.use("/api", pacientesRoutes)

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});