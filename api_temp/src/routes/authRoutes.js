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

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.get("/usersNotAdmin", getAllNotAdmin);
router.put("/users/:userId", updateUserRole);
router.post("/verifySocio", verifySocio);
router.delete("/usersDelete/:userId", deleteUser);

module.exports = router;