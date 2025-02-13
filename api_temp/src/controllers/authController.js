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

// const registerUser = async (req, res) => {
//   const { name, email } = req.body;
//   console.log(name, email, " name, email s");
//   try {
//     // Verificar si el usuario ya existe
//     const userExists = await User.findOne({ where: { email } });
//     console.log(userExists, "userExists");
//     const isAdmin = email === process.env.ADMIN_EMAIL;
//     console.log(
//       isAdmin,
//       "ADMIN=> ESTO ME DEVUELVE TRUE EN EL CASO DE SER ADMIN"
//     );
//     if (userExists) {
//       if (isAdmin) {
//         console.log("entro a es admin?");
//         const userAdmin = await User.findOne({
//           attributes: ["id", "name", "email", "isAdmin"],
//         });
//         const users = await User.findAll({
//           attributes: ["id", "name", "email", "isAdmin"], // Obtener todos los usuarios
//         });
//         console.log("userAdmin", userAdmin);
//         return res.status(200).json({
//           message: "Usuario ya registrado y es admin",
//           userAdmin: userAdmin || null,
//           users,
//         });
//       }

//       return res.status(200).json({
//         message: "El usuario ya está registrado.",
//         user: userExists,
//       });

//       console.log("User:", user, "User Admin", userAdmin);
//     }

//     // Crear nuevo usuario
//     const newUser = await User.create({
//       name,
//       email,
//       isAdmin,
//     });

//     if (isAdmin) {
//       // Si es admin, devolver todos los usuarios después del registro
//       const users = await User.findAll({
//         attributes: ["id", "name", "email", "isAdmin"],
//       });
//       return res.status(201).json({
//         message: "Usuario registrado con éxito y es admin",
//         users,
//       });
//     }

//     return res.status(201).json({
//       message: "Usuario registrado con éxito",
//       user: {
//         id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         isAdmin: newUser.isAdmin,
//       },
//     });
//   } catch (error) {
//     console.error("Error al registrar el usuario:", error);
//     res.status(500).json({ error: "Error al registrar el usuario" });
//   }
// };

const registerUser = async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email, " name, email s");

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ where: { email } });


    // Verificar si el usuario es admin
    const isAdmin = email === process.env.ADMIN_EMAIL;


    // Si el usuario ya existe
    if (userExists) {
      // Si es admin, devolver los datos del admin y todos los usuarios
      if (isAdmin) {
    
        const userAdmin = await User.findOne({
          attributes: ["id", "name", "email", "isAdmin"],
        });
        const users = await User.findAll({
          attributes: ["id", "name", "email", "isAdmin"], // Obtener todos los usuarios
        });
        console.log("userAdmin => FIJARSE EN PRODUCCION QUE PASA ACA", userAdmin);
        
        return res.status(200).json({
          message: "Usuario ya registrado y es admin",
          userAdmin: userAdmin || null,
          users,
        });
      }

      // Si no es admin, devolver solo los datos del usuario existente
      return res.status(200).json({
        message: "El usuario ya está registrado.",
        user: userExists,
      });
    }

    // Si el usuario no existe, crear un nuevo usuario
    const newUser = await User.create({
      name,
      email,
      isAdmin,
    });

    // Si es admin, devolver todos los usuarios después del registro
    if (isAdmin) {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "isAdmin"],
      });
      return res.status(201).json({
        message: "Usuario registrado con éxito y es admin",
        users,
      });
    }

    // Si no es admin, devolver solo los datos del nuevo usuario
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

const upgradeToPremium = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar a premium
    await user.update({
      membershipType: "premium",
      isApproved: true,
    });

    // Notificar al usuario vía email/WhatsApp
    sendWhatsAppMessage(
      user.phone,
      "¡Tu cuenta premium está activa! Accede a la tienda aquí: [link]"
    );

    res
      .status(200)
      .json({ message: "Usuario actualizado a premium exitosamente" });
  } catch (error) {
    console.error("Error actualizando a premium:", error);
    res.status(500).json({ error: "Error en la actualización" });
  }
};

const getPendingUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        membershipType: "adherente", // Solo usuarios adherentes
      },
      attributes: ["id", "name", "email", "phone", "createdAt"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios pendientes:", error);
    res.status(500).json({ error: "Error al obtener usuarios pendientes" });
  }
};

// Actualizar rol de usuario
const updateUserRole = async (req, res) => {
  console.log("entra a esta funcion de update role????");
  const { userId } = req.params;
  const { membershipType } = req.body;
  console.log(membershipType, "BACKEND");
  try {
    // Verifica que el rol sea válido
    if (!["premium", "gestor", "sinMembresia"].includes(membershipType)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    // Actualizar el rol del usuario
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el rol
    user.membershipType = membershipType;
    await user.save();
    console.log(user);
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
  upgradeToPremium,
  getPendingUsers,
  updateUserRole,
};
