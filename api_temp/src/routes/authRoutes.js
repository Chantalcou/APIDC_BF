const express = require("express");
const {
  registerUser,
  loginUser,
  verifySocio,
  deleteUser,
  getAllUsers,
  getAllNotAdmin,
  verifyToken,
  isAdmin,
  updateUserRole,
} = require("../controllers/authController");
const router = express.Router();

// Ruta para registrar usuario (no requiere autenticación)
router.post("/register", registerUser);

// Ruta para iniciar sesión (no requiere autenticación)
router.post("/login", loginUser);

// Ruta para obtener todos los usuarios (requiere autenticación y ser admin)
router.get("/users", verifyToken, isAdmin, getAllUsers);

// Ruta para obtener todos los usuarios (requiere autenticación)
router.get("/usersNotAdmin", getAllNotAdmin);

// Ruta para actualizar el rol de un usuario
router.put("/users/:userId", updateUserRole);

// Ruta para verificar socio
router.post("/verifySocio", verifySocio);

// Ruta para elimianr usuarios del dashboard

router.delete("/usersDelete/:userId", deleteUser);

module.exports = router;
