const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

// Configurar el cliente JWKS de Auth0
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Función para obtener la clave pública
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

// Middleware para verificar el token de Auth0
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token recibido:", token);

  // Verificar el token primero
  jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }

    console.log("Datos decodificados:", decoded); // Aquí obtendrás el payload decodificado

    // Añadir los datos del usuario al objeto de la solicitud
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
