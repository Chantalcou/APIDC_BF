import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserRole } from "../redux/actions/index";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  console.log(users,'=> este users lo trae del reducer')

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    dispatch(fetchUsers(token));
  }, [dispatch]);

  const handleRoleUpdate = async (userId, membershipType) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No se encontró token de autenticación.");
      return;
    }

    // Encuentra el usuario actual
    const user = users.find((u) => u.id === userId);
    console.log(user, '=>user en el dashboard')

    // Si el usuario ya tiene el rol, lo quitamos (sin membresía)
    const updatedMembershipType =
      user.membershipType === membershipType ? "sinMembresia" : membershipType;

    // Actualiza el estado localmente para reflejar cambios inmediatos en la UI
    dispatch({
      type: "UPDATE_USER_ROLE_OPTIMISTIC",
      payload: { userId, membershipType: updatedMembershipType },
    });

    try {
      // Envia la actualización al backend
      await dispatch(updateUserRole(userId, updatedMembershipType, token));
      setSuccess(
        `Usuario ${userId} actualizado a ${
          updatedMembershipType || "sin membresía"
        }`
      );
    } catch (err) {
      // Si hay un error, revierte el cambio en la UI
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
              <th>Sin Membresia</th>
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
                    checked={user.membershipType === "sinMembresia"} // Solo se marcará si membershipType es "sinMembresia"
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
