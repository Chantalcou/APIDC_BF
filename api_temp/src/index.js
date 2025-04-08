const path = require("path");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/nodeMailerRoutes");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
global.fetch = fetch;
global.Headers = fetch.Headers;
const sequelize = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
// Middlewares
app.use(
  cors({
    origin: "https://apidc.ong",
    // origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "application/json" })); // Por si viene como texto
app.use(bodyParser.raw({ type: "application/octet-stream" }));

// Rutas API
app.use("/", authRoutes);
// Ruta mailer
app.use("/", emailRoutes);

// Sirve el frontend React (solo en producción)
if (process.env.NODE_ENV === "production") {
  // Configura la ruta correcta para los archivos estáticos del frontend
  app.use(express.static(path.join(__dirname, "../../client_temp/build")));
  console.log(path.join(__dirname, "../client_temp/build"));

  // Ruta catch-all para servir el frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client_temp/build", "index.html"));
  });
}

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ error: "Ha ocurrido un error interno en el servidor" });
});

// Conexión a la base de datos
sequelize
  .query("SELECT NOW()")
  .then(() => {
    console.log("Conexión a la base de datos PostgreSQL exitosa");
  })
  .catch((err) => {
    console.error("Error al conectarse a la base de datos:", err);
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false });

// sequelize
//   .sync({ alter: true })
//   .then(() => console.log("Base de datos sincronizada"))
//   .catch((err) => console.error("Error al sincronizar la base de datos:", err));
