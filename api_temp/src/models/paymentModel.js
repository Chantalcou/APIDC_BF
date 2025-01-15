const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const User = require("./userModel");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2), // Ejemplo: cantidad decimal
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending", // Puede ser "pending", "completed", "failed"
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Payments",
    timestamps: true,
  }
);

// Relación: Un usuario puede tener muchos pagos
User.hasMany(Payment, { foreignKey: "userId", onDelete: "CASCADE" });
Payment.belongsTo(User, { foreignKey: "userId" });

module.exports = Payment;
