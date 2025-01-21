const express = require("express");
const {
  sendEmailToUser,
  sendEmailToAdmin,
  sendEmailWorkTogether,
} = require("../controllers/nodeMailerController");
const router = express.Router();

// Ruta para enviar correo al usuario
router.post("/user", sendEmailToUser);

// Ruta para enviar correo al administrador
router.post("/admin", sendEmailToAdmin);
// Esta ruta es para la gente que quiere trabajar con la asosiacion
router.post("/workWithUs", sendEmailWorkTogether);

module.exports = router;
