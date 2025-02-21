require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const { User } = require("./models/userModel"); // Asegúrate de tener el modelo de usuario configurado
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const mailerRoutes = require("./routes/nodeMailerRoutes");
const socket = require("./socket"); // Importa el archivo de socket.js

// Verifica si faltan variables de entorno críticas
if (
  !process.env.DB_USER ||
  !process.env.DB_NAME ||
  !process.env.DB_PASSWORD ||
  !process.env.PORT ||
  !process.env.DATABASE_URL
) {
  throw new Error("❌ Faltan variables de entorno críticas");
}

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app); // Usamos `server` para `socket.io`

// Configuración de CORS para el servidor HTTP y Socket.IO
// app.use(
//   cors({
//     origin: "http://localhost:3000",  // Cambia esto según la URL de tu frontend
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Permite cookies y credenciales
//   })
// );
// Produccion
app.use(
  cors({
    origin: "https://apidc-bf-2.onrender.com", // Cambia esto según la URL de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Permite cookies y credenciales
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Inicializar Socket.IO con el servidor HTTP
socket.initialize(server); // Aquí inicializamos Socket.IO

// Rutas
app.use("/send", mailerRoutes);
app.use("/", authRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../../client_temp/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client_temp/build", "index.html"));
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res
    .status(500)
    .json({ error: "Ha ocurrido un error interno en el servidor" });
});

// Conexión a la base de datos con Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Conexión a la base de datos PostgreSQL exitosa");
  })
  .catch((err) => {
    console.error("❌ Error al conectarse a la base de datos:", err);
  });

// Iniciar el servidor con `server.listen()`, NO `app.listen()`
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// Sincronizar Sequelize (sin `force: true` para evitar borrar datos)
sequelize.sync({ force: false });
