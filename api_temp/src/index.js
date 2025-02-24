require("dotenv").config();
const cors = require("cors");
const { json } = require("express");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/db");

const express = require("express");
const path = require("path");  // Para servir archivos estáticos

const app = express();
const PORT = process.env.PORT || 10000;

// Configuración CORS
app.use(
  cors({
    origin: "https://apidc-bf-2.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(json()); // Para manejar JSON

// Sirve archivos estáticos de la carpeta build (frontend)
app.use(express.static(path.join(__dirname, "build")));

// Ruta básica de verificación
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API de APIDC funcionando correctamente",
    status: "OK"
  });
});

// Rutas de autenticación
app.use("/auth", authRoutes);

// Ruta para redirigir a frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ error: "Ha ocurrido un error interno en el servidor" });
});

// Verificación de conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

sequelize.sync({ force: false });
