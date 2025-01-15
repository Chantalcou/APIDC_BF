const express = require("express");
const { sendEmailToUser, sendEmailToAdmin } = require("../controllers/nodeMailerController");
const router = express.Router();

// Ruta para enviar correo al usuario
router.post("/user", sendEmailToUser);

// Ruta para enviar correo al administrador
router.post("/admin", sendEmailToAdmin);

module.exports = router;
