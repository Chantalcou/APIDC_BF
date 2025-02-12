const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const { v4: uuidv4 } = require("uuid"); // Para generar UUIDs

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID, // Cambia el tipo de dato a UUID
      defaultValue: DataTypes.UUIDV4, // Genera un UUID v4 automáticamente
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    auth0Id: {
      type: DataTypes.STRING,
      allowNull: true,   //Modificar a false apenas lo consiga
      unique: true,
    },
    // NUEVOS CAMPOS
    membershipType: {
      type: DataTypes.ENUM('sinMembresia', 'premium', 'gestor'),
      defaultValue: 'sinMembresia'
    },
    paymentProof: { // URL a comprobante de pago subido
      type: DataTypes.STRING,
      allowNull: true
    },
    isApproved: { // Aprobación manual por admin
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gestorCode: { // Código único para referidos (si es gestor)
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    referredBy: { // ID del gestor que lo refirió
      type: DataTypes.INTEGER,
      allowNull: true
    }
    // authProvider: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "auth0",
    // },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;
