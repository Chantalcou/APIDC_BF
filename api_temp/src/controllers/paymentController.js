const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

const createPayment = async (req, res) => {
  const { userId, amount, description } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const payment = await Payment.create({ userId, amount, description, status: "pending" });
    res.status(201).json({ message: "Pago creado con éxito", payment });
  } catch (error) {
    console.error("Error al crear el pago:", error);
    res.status(500).json({ message: "Error al crear el pago" });
  }
};

module.exports = { createPayment };
