const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

const sendChatMessage = async (req, res) => {
  const { message } = req.body;

  console.log("Mensaje recibido:", message); // ✅

  if (!message) {
    return res.status(400).json({ error: "El mensaje es requerido" });
  }

  const prompt = `
    Eres un asistente especializado en diseño web y desarrollo frontend. 
    Responde siempre en español. Mantén tus respuestas concisas y profesionales.
    El usuario está trabajando con React y necesita ayuda con: ${message}
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se pudo obtener respuesta.";

    console.log(reply, "Respuesta del chatbot");

    return res.json({ reply });
  } catch (error) {
    console.error("Error al llamar a Gemini:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { sendChatMessage };
