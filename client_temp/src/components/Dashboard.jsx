import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserRoleNoToken } from "../redux/actions/index";
import io from "socket.io-client";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, user } =
    useSelector((state) => state);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [socket, setSocket] = useState(null); // <- Estado para almacenar la instancia de Socket.IO

  // Leer usuarios del localStorage solo una vez al montar el componente
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      dispatch({
        type: "SET_USERS_FROM_STORAGE",
        payload: JSON.parse(storedUsers),
      });
    }
  }, [dispatch]);

  // Conexión Socket.IO
  useEffect(() => {
    const newSocket = io("https://apidc-bf-2.onrender.com"); // Crear una nueva instancia de Socket.IO
    setSocket(newSocket); // Guardar la instancia en el estado

    newSocket.on("user_updated", (data) => {
      console.log("Datos del usuario actualizados:", data);
      // Verificar si el email del evento coincide con el email del usuario autenticado
      if (user && data.email === user.email) {
        dispatch(updateUserRoleNoToken(data.id, data.membershipType));
      }
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      newSocket.disconnect();
    };
  }, [dispatch, user]);

  // Guardar usuarios en localStorage cuando cambie la lista
  useEffect(() => {
    if (users && users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const handleRoleUpdate = async (userId, membershipType) => {
    const user = users.find((u) => u.id === userId);
    const updatedMembershipType =
      user.membershipType === membershipType ? "sinMembresia" : membershipType;

    // Actualización optimista
    dispatch({
      type: "UPDATE_USER_ROLE_OPTIMISTIC",
      payload: { userId, membershipType: updatedMembershipType },
    });

    try {
      await dispatch(updateUserRoleNoToken(userId, updatedMembershipType));
      setSuccess(
        `Usuario ${userId} actualizado a ${updatedMembershipType || "sin membresía"}`
      );
    } catch (err) {
      dispatch({
        type: "UPDATE_USER_ROLE_OPTIMISTIC",
        payload: { userId, membershipType: user.membershipType },
      });
      setError("Error al actualizar el rol del usuario");
    }
  };

  return (
    <Container>
      <div className="content-dashboard">
        <h1>Dashboard de Administración</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol Actual</th>
              <th>Socio Premium</th>
              <th>Socio Gestor</th>
              <th>Sin Membresía</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.membershipType}</td>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={user.membershipType === "premium"}
                    onChange={() => handleRoleUpdate(user.id, "premium")}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={user.membershipType === "gestor"}
                    onChange={() => handleRoleUpdate(user.id, "gestor")}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={user.membershipType === "sinMembresia"}
                    onChange={() => handleRoleUpdate(user.id, "sinMembresia")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Dashboard;