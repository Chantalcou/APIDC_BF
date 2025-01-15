// controllers/userController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { createRemoteJWKSet, jwtVerify } = require("jose");
const jwksClient = require("jwks-rsa");
const sequelize = require("../config/db.js");

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

// Configurar cliente JWKS para Auth0
const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
const client = jwksClient({ jwksUri });
const JWKS = createRemoteJWKSet(new URL(jwksUri));

// Obtener clave pública para jwt.verify
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, key.getPublicKey());
    }
  });
}

// Middleware para verificar tokens JWT
// const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Token no proporcionado o mal formado" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const { payload } = await jwtVerify(token, JWKS); // Usar jose para verificar el token
//     req.user = payload;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token no válido o expirado" });
//   }
// };
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
    const { payload } = await jwtVerify(token, JWKS); // Verifica el token
    console.log("Token válido, payload:", payload);
    req.user = payload; // Adjunta el usuario al request
    next();
  } catch (err) {
    console.error("Error verificando el token:", err);
    return res.status(401).json({ message: "Token no válido o expirado" });
  }
};

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ where: { email } });
    const isAdmin = email === process.env.ADMIN_EMAIL;

    if (userExists) {
      if (isAdmin) {

        const userAmin = await User.findOne({
          attributes: ["id", "name", "email", "isAdmin"],
        });
        const users = await User.findAll({
          attributes: ["id", "name", "email", "isAdmin"], // Obtener todos los usuarios
        });
      
        return res.status(200).json({
          message: "Usuario ya registrado y es admin",
          userAmin,
          users,
        });
      }

      return res.status(200).json({
        message: "El usuario ya está registrado.",
        user: userExists,
      });
    }

    // Crear nuevo usuario
    const newUser = await User.create({
      name,
      email,
      isAdmin,
    });

    if (isAdmin) {
      // Si es admin, devolver todos los usuarios después del registro
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
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
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

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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
      attributes: ["id", "name", "email", "isAdmin"], // Excluye datos sensibles
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

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    console.log("Acceso denegado: Usuario no es admin");
    return res
      .status(403)
      .json({ message: "Acceso denegado: no eres administrador" });
  }
  next();
};

// Exportar funciones
module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  isAdmin,
  getAllUsers,
  deleteUserByEmail,
};
