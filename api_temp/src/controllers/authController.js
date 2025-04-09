// controllers/userController.js
const User = require("../models/userModel");
const { jwtVerify, createRemoteJWKSet } = require("jose");
const { getIO } = require("../socket.js");
const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;

// Configuramos JWKS para Auth0
const JWKS = createRemoteJWKSet(new URL(jwksUri));

// // Middleware para verificar el JWT con jose
// const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("Token no proporcionado o mal formado");
//     return res.status(401).json({ message: "Token no proporcionado o mal formado" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const { payload } = await jwtVerify(token, JWKS, {
//       issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//       audience: process.env.AUTH0_AUDIENCE,
//     });
//     req.user = payload;
//     next();
//   } catch (err) {
//     console.error("Error verificando el token:", err);
//     return res.status(401).json({ message: "Token inválido o expirado" });
//   }
// };
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    console.error("Error verificando token:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const isAdmin = email === process.env.ADMIN_EMAIL;
    console.log(isAdmin, "ESTE ES EL IS ADMIN DEL BACKEND");

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
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};
const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    res.status(200).json({
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
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "isAdmin", "membershipType"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getAllNotAdmin = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "isAdmin", "membershipType"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

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

// Middleware para verificar si el usuario es admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
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

    return res.status(200).json({ message: "Rol actualizado con éxito", user });
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return res.status(500).json({ message: "Error al actualizar el rol" });
  }
};

// Verificar si el socio coincide con el id y email, y si es un socio premium o gestor
const verifySocio = async (req, res) => {
  const { email, id_socio } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.membershipType !== "premium" && user.membershipType !== "gestor") {
      return res.status(403).json({
        message: "El usuario no es un socio premium ni gestor",
      });
    } else {
      console.log("La búsqueda fue exitosa", user);
    }

    return res.status(200).json({
      success: true,
      socio: user,
    });
  } catch (error) {
    console.error("Error al verificar el socio:", error);
    return res.status(500).json({ message: "Error al verificar el socio" });
  }
};
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user)
      return res.status(404).json({ message: `Usuario no encontrado` });

    if (user.email === process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ message: "No se puede eliminar al administrador principal" });
    }

    await user.destroy();
    res
      .status(200)
      .json({ message: `Usuario eliminado correctamente`, userDeleted: user });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};

// const handleJotFormWebhook = async (req, res) => {
//   try {
//     if (req.method === "OPTIONS") {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader("Access-Control-Allow-Methods", "POST");
//       res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//       return res.status(204).end();
//     }

//     const { formID, submissionID, rawRequest } = req.body;
//     const YOUR_FORM_ID = 250913776216662;

//     if (!rawRequest) {
//       return res.status(400).json({ message: "Falta rawRequest" });
//     }

//     let formData;
//     try {
//       formData = JSON.parse(rawRequest);
//     } catch (error) {
//       return res.status(400).json({ message: "rawRequest inválido (JSON)" });
//     }

//     if (parseInt(formID) !== YOUR_FORM_ID || !submissionID) {
//       return res
//         .status(200)
//         .json({ message: "Webhook recibido pero no válido" });
//     }

//     // Armado de datos
//     const userData = {
//       name: `${formData.q3_fullName3?.first ?? ""} ${
//         formData.q3_fullName3?.last ?? ""
//       }`.trim(),
//       birthdate: new Date(
//         `${formData.q31_fechaDe?.year}-${formData.q31_fechaDe?.month.padStart(
//           2,
//           "0"
//         )}-${formData.q31_fechaDe?.day.padStart(2, "0")}`
//       ),
//       dni: formData.q32_dni?.toString().replace(/\D/g, "") ?? null,
//       email: formData.q33_email?.toLowerCase().trim() ?? null,
//       phone: formData.q34_telefono?.full?.replace(/\D/g, "") ?? null,
//       address: [
//         formData.q4_address4?.addr_line1,
//         formData.q4_address4?.addr_line2,
//         formData.q4_address4?.city,
//         formData.q4_address4?.state,
//         formData.q4_address4?.postal,
//       ]
//         .filter(Boolean)
//         .join(", "),
//       hasReprocann: formData.q45_poseeReprocann === "Sí",
//       reprocannNumber: formData.q36_numeroDe?.toString().trim() ?? null,
//       reprocannExpiry: formData.q37_fechaDe37?.year
//         ? new Date(
//             `${
//               formData.q37_fechaDe37.year
//             }-${formData.q37_fechaDe37.month.padStart(
//               2,
//               "0"
//             )}-${formData.q37_fechaDe37.day.padStart(2, "0")}`
//           )
//         : null,
//       gestorAsociado: formData.q41_gestorAsociado41 === "Sí",
//       isAdmin: ["chantiicou@gmail.com", process.env.ADMIN_EMAIL].includes(
//         formData.q33_email?.toLowerCase()
//       ),
//     };

//     // Guardar o actualizar
//     let user = await User.findOne({ where: { email: userData.email } });
//     const isNew = !user;

//     if (isNew) {
//       user = await User.create(userData);
//     } else {
//       await user.update(userData);
//       await user.reload();
//     }

//     return res.status(isNew ? 201 : 200).json({
//       message: isNew ? "Usuario creado" : "Usuario actualizado",
//       user,
//     });
//   } catch (error) {
//     console.error("Error webhook:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };
// const getJotformSubmissions = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error al obtener usuarios:", error);
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

module.exports = {
  registerUser,
  deleteUser,
  loginUser,
  verifyToken, // Usamos la versión actualizada con jose
  isAdmin,
  getAllNotAdmin,
  getAllUsers,
  deleteUserByEmail,
  updateUserRole,
  verifySocio,
  // handleJotFormWebhook,
  // getJotformSubmissions,
};
