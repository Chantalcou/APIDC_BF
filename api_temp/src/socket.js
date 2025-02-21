const socketIo = require("socket.io");

let io;

const initialize = (httpServer) => {
  io = socketIo(httpServer, {
    cors: {
      origin: "https://apidc-bf-2.onrender.com",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado", socket.id);

    // Escuchar evento de desconexión
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("SocketIO no ha sido inicializado");
  }
  return io;
};

module.exports = { initialize, getIO };
