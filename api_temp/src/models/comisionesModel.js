const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Comision = sequelize.define(
    "Comision",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      estadoPago: {
        type: DataTypes.ENUM('pendiente', 'pagado', 'rechazado'),
        defaultValue: 'pendiente'
      },
      fechaPago: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      tableName: "Comisiones",
      timestamps: true,
    }
  );

  
module.exports = Comision;