const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Referido = sequelize.define(
  "Referido",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codigoReferencia: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    descuentoAplicado: {
      type: DataTypes.FLOAT, // % de descuento para el referido
      defaultValue: 10.0, // Ej: 10% de descuento
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo", "pendiente"),
      defaultValue: "pendiente",
    },
  },
  {
    tableName: "Referidos",
    timestamps: true,
  }
);

module.exports = Referido;
