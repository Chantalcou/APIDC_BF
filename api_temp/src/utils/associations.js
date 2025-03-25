// const User = require("../models/userModel");
// const Gestor = require("../models/gestorModel");
// const Referido = require("../models/referidoModel");
// const Comision = require("../models/comisionesModel");

// const setupAssociations = () => {
//   // Relación Usuario -> Gestor
//   User.belongsTo(Gestor, {
//     foreignKey: 'referidoPor',
//     as: 'GestorReferente'
//   });

//   // Relación Gestor -> Usuarios
//   Gestor.hasMany(User, {
//     foreignKey: 'referidoPor',
//     as: 'UsuariosReferidos'
//   });

//   // Relación Gestor -> Referidos
//   Gestor.hasMany(Referido, {
//     foreignKey: 'gestorId',
//     as: 'Referidos'
//   });

//   // Relación Referido -> Gestor
//   Referido.belongsTo(Gestor, {
//     foreignKey: 'gestorId',
//     as: 'Gestor'
//   });

//   // Relación Referido -> Usuario
//   Referido.belongsTo(User, {
//     foreignKey: 'usuarioId',
//     as: 'Usuario'
//   });

//   // Relación Comisión -> Gestor
//   Comision.belongsTo(Gestor, {
//     foreignKey: 'gestorId',
//     as: 'Gestor'
//   });

//   // Relación Comisión -> Referido
//   Comision.belongsTo(Referido, {
//     foreignKey: 'referidoId',
//     as: 'Referido'
//   });
// };

// module.exports = setupAssociations;