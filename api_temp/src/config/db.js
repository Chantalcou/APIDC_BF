// config/database.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
// Probar la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

testConnection();

module.exports = sequelize;
