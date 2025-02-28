const path = require("path");
require("dotenv").config();
const cors = require("cors");
const { json } = require("express");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");
const sequelize = require("./config/db");

const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin:'http://localhost:3000',
    // origin: "https://apidc-bf.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(json()); // Para manejar JSON sin usar bodyParser
// Ruta CORRECTA para archivos estáticos
app.use(express.static(path.join(__dirname, "../../client_temp/build")));

// Ruta catch-all
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client_temp/build", "index.html"));
});

// Rutas
app.use("/", authRoutes);

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ error: "Ha ocurrido un error interno en el servidor" });
});

// sequielize conexion
sequelize
  .query("SELECT NOW()")
  .then(([results, metadata]) => {
    console.log("Conexión a la base de datos PostgreSQL exitosa");
  })
  .catch((err) => {
    console.error("Error al conectarse a la base de datos:", err);
  });
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

sequelize.sync({ force: false });
