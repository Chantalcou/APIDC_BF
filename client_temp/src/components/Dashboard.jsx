import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserRole } from "../redux/actions/index";
import io from "socket.io-client";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users); // Extraer correctamente
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 🟢 Cargar usuarios desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      dispatch({
        type: "SET_USERS_FROM_STORAGE",
        payload: JSON.parse(storedUsers),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const socket = io("http://localhost:5001");

    socket.on("connect", () => {
      console.log("Conexión establecida con el servidor de Socket.IO");
    });

    socket.on("user_updated", (data) => {
      console.log("Datos del usuario actualizados:", data);
      dispatch(updateUserRole(data.id, data.membershipType));
    });

    return () => socket.disconnect();
  }, [dispatch]);

  // 🟢 Guardar users en localStorage cada vez que cambien
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);
  const handleRoleUpdate = async (userId, membershipType) => {
    const user = users.find((u) => u.id === userId);
    const updatedMembershipType =
      user.membershipType === membershipType ? "sinMembresia" : membershipType;

    // Actualiza el estado de manera optimista
    dispatch({
      type: "UPDATE_USER_ROLE_OPTIMISTIC",
      payload: { userId, membershipType: updatedMembershipType },
    });

    try {
      // Aquí ya no se pasa el token
      await dispatch(updateUserRole(userId, updatedMembershipType));

      setSuccess(
        `Usuario ${userId} actualizado a ${
          updatedMembershipType || "sin membresía"
        }`
      );
    } catch (err) {
      dispatch({
        type: "UPDATE_USER_ROLE_OPTIMISTIC",
        payload: { userId, membershipType: user.membershipType }, // Restaura al valor anterior si hay error
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
