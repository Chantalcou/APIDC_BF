// Modelo para SociosPremium
const SocioPremium = sequelize.define(
    "SocioPremium",
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
      },
      direccionCultivo: {
        type: DataTypes.STRING,
        allowNull: true, // Solo aplica a socios con Reprocan
      },
      numeroGestor: {
        type: DataTypes.STRING,
        allowNull: true, // Solo aplica a socios con Reprocan
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
      tableName: "SociosPremium",
      timestamps: true,
    }
  );

  module.exports = {  SocioPremium };