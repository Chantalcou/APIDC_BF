// Modelo para SociosAdherentes
const SocioAdherente = sequelize.define(
    "SocioAdherente",
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
      tipoSocio: {
        type: DataTypes.ENUM("Adherente", "Con Reprocan", "Gestor"),
        allowNull: false,
      },
      fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      cuotaMensual: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 10000,
      },
      estadoPago: {
        type: DataTypes.ENUM("Pendiente", "Pagado", "Vencido"),
        allowNull: false,
      },
      comprobantePago: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "SociosAdherentes",
      timestamps: true,
    }
  );


  module.exports = {SocioAdherente };