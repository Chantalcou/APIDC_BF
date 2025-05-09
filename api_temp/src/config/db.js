// Produccion
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Crear una nueva instancia de Sequelize utilizando la URL de conexión completa
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Verificación de conexión
sequelize
  .authenticate()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
  .catch((err) => console.error("❌ Error de conexión:", err));

module.exports = sequelize;

//  Local
// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "postgres",
//     logging: false,
//   }
// );

// // Probar la conexión
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Conexión a la base de datos establecida correctamente.");
//   } catch (error) {
//     console.error("No se pudo conectar a la base de datos:", error);
//   }
// }

// testConnection();

// module.exports = sequelize;
