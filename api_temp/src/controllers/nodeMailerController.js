const sendMail = require("../config/mailer");

const sendEmailToUser = async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res
      .status(400)
      .json({ error: "El correo y el mensaje son requeridos" });
  }
  try {
    await sendMail(
      email, // Correo del usuario
      "Gracias por contactarnos",
      `Hola, hemos recibido tu mensaje: "${message}". Nos pondremos en contacto pronto.
        APIDC - Asociación civil para la investigación y desarrollo del cannabis y sus derivados.`
    );
    res.status(200).json({ message: "Correo enviado exitosamente al usuario" });
  } catch (error) {
    res.status(500).json({ error: "Error al enviar el correo" });
  }
};

//Email que le llega a APIDC con la info del usuario
const sendEmailToAdmin = async (req, res) => {

  try {
    if (!fullName || !lastName || !email || !phone) {
      console.error("Faltan datos obligatorios:", {
        fullName,
        lastName,
        email,
        phone,
        reprocanNumber,
      });
      return res.status(400).json({ error: "Faltan datos" });
    }

    await sendMail(
      process.env.EMAIL_USER,
      "Nuevo mensaje recibido",
      `Has recibido un mensaje de ${email}: Nombre completo: ${fullName} ${lastName}, Teléfono: ${phone}, Número Reprocan: ${reprocanNumber}, Tipo de socio: ${memberType}, mensaje: ${message}`
    );

    res
      .status(200)
      .json({ message: "Correo enviado exitosamente al administrador" });
  } catch (error) {
    console.error("Error en sendEmailToAdmin:", error.message);
    res
      .status(500)
      .json({ error: "Error al enviar el correo", details: error.message });
  }
};

//Email que le llega a APIDC-work with us
const sendEmailWorkTogether = async (req, res) => {

  try {
    const { email, fullName, message } = req.body;


    if (!email || !fullName || !message) {
      console.error("Faltan datos obligatorios:", {
        email,
        fullName,
        message,
      });
      return res.status(400).json({ error: "Faltan datos" });
    }

    await sendMail(
      process.env.EMAIL_USER,
      "Nuevo mensaje recibido",
      `Has recibido un mensaje de: Email: ${email}: Nombre completo: ${fullName} , Email: ${email}, mensaje: ${message}`
    );

    res
      .status(200)
      .json({ message: "Correo enviado exitosamente al administrador" });
  } catch (error) {
    console.error("Error en sendEmailToAdmin:", error.message);
    res
      .status(500)
      .json({ error: "Error al enviar el correo", details: error.message });
  }
};

module.exports = { sendEmailToUser, sendEmailToAdmin,sendEmailWorkTogether };
