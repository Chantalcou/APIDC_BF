const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

// Modelo para Gestores
const Gestor = sequelize.define(
  "Gestor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigoPostal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeroGestor: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    comision: {
      type: DataTypes.FLOAT, // Porcentaje de comisión
      allowNull: false,
    },
  },
  {
    tableName: "Gestores",
    timestamps: true,
  }
);

module.exports = { Gestor };