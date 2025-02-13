const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  verifyToken,
  isAdmin,
  updateUserRole,
} = require("../controllers/authController");
const router = express.Router();

// Ruta para registrar usuario (no requiere autenticación)
router.post("/register", registerUser);

// Ruta para iniciar sesión (no requiere autenticación)
router.post("/login", loginUser);

router.get("/users", verifyToken, isAdmin, getAllUsers);

router.put("/users/:userId", updateUserRole); // Ruta para actualizar rol de usuario


// Rutas protegidas que requieren verificación del token
// router.get("/protected-route", verifyToken, (req, res) => {
//   res.json({ message: "Acceso autorizado", user: req.user });
// });

module.exports = router;
