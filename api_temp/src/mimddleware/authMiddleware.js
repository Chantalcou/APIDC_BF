// const jwt = require("jsonwebtoken");
// const jwksClient = require("jwks-rsa");

// // Configurar el cliente JWKS de Auth0
// const client = jwksClient({
//   jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
// });

// // Función para obtener la clave pública
// function getKey(header, callback) {
//   client.getSigningKey(header.kid, (err, key) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       const signingKey = key.getPublicKey();
//       callback(null, signingKey);
//     }
//   });
// }

// // Middleware para verificar el token de Auth0
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Token no proporcionado" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("Token recibido:", token);

//   // Verificar el token primero
//   jwt.verify(token, getKey, {}, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Token no válido" });
//     }

//     console.log("Datos decodificados:", decoded); // Aquí obtendrás el payload decodificado

//     // Añadir los datos del usuario al objeto de la solicitud
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = verifyToken;
// middleware/authMiddleware.js
// middleware/authMiddleware.js

// middleware/authMiddleware.js
// middlewares/authMiddleware.js
// middleware/verifyToken.js
// controllers/authController.js


const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization header:', authHeader);
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token recibido:', token);
  
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      audience: process.env.AUTH0_AUDIENCE
    });
    
    console.log('Token verificado, payload:', payload);
    req.user = payload;
    next();
  } catch (error) {
    console.error('Error verificando token:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
