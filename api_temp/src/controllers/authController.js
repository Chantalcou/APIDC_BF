// controllers/userController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { createRemoteJWKSet, jwtVerify } = require("jose");
const jwksClient = require("jwks-rsa");
const { getIO } = require("../socket.js");
const secret = process.env.JWT_SECRET;

// Validar las variables de entorno al inicio
if (
  !process.env.JWT_SECRET ||
  !process.env.AUTH0_DOMAIN ||
  !process.env.ADMIN_EMAIL
) {
  throw new Error(
    "Faltan variables de entorno críticas. Verifica tu archivo .env"
  );
}

// Configuración del cliente JWKS para Auth0
const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
const JWKS = createRemoteJWKSet(new URL(jwksUri)); // Configuramos JWKS para el cliente

// Middleware para verificar el JWT
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token no proporcionado o mal formado");
    return res
      .status(401)
      .json({ message: "Token no proporcionado o mal formado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const { payload } = await jwtVerify(token, JWKS); // Verifica el token con el JWKS
    console.log("Token válido, payload:", payload);
    req.user = payload; // Adjunta el usuario al request
    next();
  } catch (err) {
    console.error("Error verificando el token:", err);
    return res.status(401).json({ message: "Token no válido o expirado" });
  }
};

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const isAdmin = email === process.env.ADMIN_EMAIL;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      if (isAdmin) {
        const userAdmin = await User.findOne({
          where: { email: process.env.ADMIN_EMAIL },
          attributes: ["id", "name", "email", "isAdmin"],
        });

        const users = await User.findAll({
          attributes: ["id", "name", "email", "isAdmin"],
        });

        return res.status(200).json({
          message: "Usuario ya registrado y es admin",
          userAdmin,
          users,
        });
      }

      return res.status(200).json({
        message: "El usuario ya está registrado.",
        user: userExists,
      });
    }

    const newUser = await User.create({
      name,
      email,
      isAdmin,
    });

    if (isAdmin) {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "isAdmin"],
      });
      return res.status(201).json({
        message: "Usuario registrado con éxito y es admin",
        users,
      });
    }

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    if (email === process.env.ADMIN_EMAIL && !user.isAdmin) {
      user.isAdmin = true;
      await user.save();
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};

// Obtener todos los usuarios (solo admins)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "isAdmin"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Eliminar usuario por email
const deleteUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: `Usuario con email "${email}" no encontrado` });
    }

    await user.destroy();
    res
      .status(200)
      .json({ message: `Usuario con email "${email}" eliminado con éxito` });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

// Verificar si el usuario es admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    console.log("Acceso denegado: Usuario no es admin");
    return res
      .status(403)
      .json({ message: "Acceso denegado: no eres administrador" });
  }
  next();
};

// Actualizar rol de usuario
const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { membershipType } = req.body;

  try {
    if (!["premium", "gestor", "sinMembresia"].includes(membershipType)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.membershipType = membershipType;
    await user.save();

    // getIO().emit("user_updated", {
    //   id: user.id,
    //   membershipType: user.membershipType,
    //   email: user.email
    // });

    return res.status(200).json({ message: "Rol actualizado con éxito", user });
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return res.status(500).json({ message: "Error al actualizar el rol" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  isAdmin,
  getAllUsers,
  deleteUserByEmail,
  // getPendingUsers,
  updateUserRole,
};
