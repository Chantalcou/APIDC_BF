require("dotenv").config();
const cors = require("cors");
const { json } = require("express");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");
const sequelize = require("./config/db");
const bodyParser = require("body-parser");
const mailerRoutes = require("./routes/nodeMailerRoutes");
const path = require("path");

// Verifica si faltan variables de entorno críticas
if (
  !process.env.DB_USER ||
  !process.env.DB_NAME ||
  !process.env.DB_PASSWORD ||
  !process.env.PORT ||
  !process.env.DATABASE_URL
) {
  throw new Error("Faltan variables de entorno críticas");
}

const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

// LOCAL
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://apidc-bf-2.onrender.com", // URL de tu frontend en producción
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Para permitir cookies y tokens de autenticación
  })
);

// Configurar los orígenes permitidos - DESARROLLO
// const corsOptions = {
//   origin: "https://apidc-bf-2.onrender.com",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));

// Rutas
app.use("/send", mailerRoutes);
app.use("/", authRoutes);

app.use(json()); // Para manejar JSON sin usar bodyParser
app.use(bodyParser.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../../client_temp/build")));

// Manejar todas las demás rutas para servir el frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client_temp/build", "index.html"));
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ error: "Ha ocurrido un error interno en el servidor" });
});

// Conexión a la base de datos con Sequelize (usando DATABASE_URL)
sequelize
  .authenticate()
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

// Sincronizar Sequelize
sequelize.sync({ force: false });
