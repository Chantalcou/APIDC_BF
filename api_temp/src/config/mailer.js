
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.apidc.ong",  // o el SMTP de tu proveedor (ej: "smtp.zoho.com")
  port: 465,               // Usualmente 465 (SSL) o 587 (TLS)
  secure: true,            // true para 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,     // info@apidc.ong
    pass: process.env.EMAIL_PASSWORD  // Contraseña del correo (no de Gmail)
  },
  tls: {
    rejectUnauthorized: false // Solo para desarrollo (quitar en producción)
  }
});

// Función para enviar correo
const sendMail = async (to, subject, text) => {


  try {
    const info = await transporter.sendMail({
      from: `"APIDC" <${process.env.EMAIL_USER}>`, 
      to,
      subject,
      text,
    });

  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};



module.exports = sendMail;
