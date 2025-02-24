const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      // Configura SSL aquí
      require: true,
      rejectUnauthorized: false, // Obligatorio para Render
    },
  },
});

// Verificación de conexión
sequelize
  .authenticate()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
  .catch((err) => console.error("❌ Error de conexión:", err));

module.exports = sequelize;
