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
