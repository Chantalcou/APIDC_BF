const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Servicio que voy a utilizar
  auth: {
    user: process.env.EMAIL_USER, // Configurado en tu archivo .env /EMAIL DE APIDC
    pass: process.env.EMAIL_PASSWORD, // Configurado en tu archivo .env - Password APIDC -
  },
});
console.log(process.env.EMAIL_USER, "EMAIL");
const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Dirección del remitente
      to, // Dirección del destinatario
      subject, // Asunto del correo
      text, // Contenido del correo
    });
    console.log("Correo enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};

module.exports = sendMail;
