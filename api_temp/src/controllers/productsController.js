const getAllUsers = async (req, res) => {
    console.log("entra aca????");
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "isAdmin", "membershipType"],
      });
      console.log(users, "DESDE EL BACKEND USERS");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  };