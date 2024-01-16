const express = require("express");
const mongodb = require("./config/db");
const dotenv = require("dotenv");
const hostname = "localhost";
const veterinarioRoutes = require("./routers/veterinariosRoutes");

const app = express();
dotenv.config();
app.use(express.json())
mongodb();

app.use("/api", veterinarioRoutes)

const PORT = process.env.PORT || 2000;

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});
