const User = require("../models/userModel");
const { jwtVerify, createRemoteJWKSet } = require("jose");

const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
const JWKS = createRemoteJWKSet(new URL(jwksUri));

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      audience: process.env.AUTH0_AUDIENCE,
    });

    req.user = payload;
    next();
  } catch (error) {
    console.error("Error verificando token:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const isAdmin = email === process.env.ADMIN_EMAIL;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      if (isAdmin) {
        const userAdmin = await User.findOne({
          where: { email: process.env.ADMIN_EMAIL },
          attributes: ["id", "name", "email", "isAdmin", "membershipType"],
        });

        const users = await User.findAll({
          attributes: ["id", "name", "email", "isAdmin", "membershipType"],
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
        attributes: ["id", "name", "email", "isAdmin", "membershipType"],
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
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        membershipType: user.membershipType,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "isAdmin", "membershipType"],
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getAllNotAdmin = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isAdmin: false },
      attributes: ["id", "name", "email", "isAdmin", "membershipType"],
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.email || req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Acceso denegado: no eres administrador" });
  }

  next();
};

const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { membershipType } = req.body;

  try {
    if (!["socioAdherente", "sinMembresia"].includes(membershipType)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.membershipType = membershipType;
    await user.save();

    return res.status(200).json({
      message: "Rol actualizado con éxito",
      user,
    });
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return res.status(500).json({ message: "Error al actualizar el rol" });
  }
};
const verifySocio = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "El email es obligatorio",
      });
    }

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
      attributes: ["id", "name", "email", "isAdmin", "membershipType"],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    if (user.membershipType !== "socioAdherente") {
      return res.status(403).json({
        success: false,
        message: "El usuario no tiene acceso como socio adherente",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Socio adherente verificado correctamente",
      socio: user,
    });
  } catch (error) {
    console.error("Error al verificar el socio:", error);
    return res.status(500).json({
      success: false,
      message: "Error al verificar el socio",
    });
  }
};
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.email === process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        message: "No se puede eliminar al administrador principal",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
      userDeleted: user,
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifySocio,
  deleteUser,
  getAllUsers,
  getAllNotAdmin,
  verifyToken,
  isAdmin,
  updateUserRole,
};