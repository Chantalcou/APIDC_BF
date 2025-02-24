const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
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
