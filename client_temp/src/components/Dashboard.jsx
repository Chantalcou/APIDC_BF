import React, { useEffect, useState } from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole, fetchUsers,deleteUser } from "../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state);

  const { user } = useAuth0();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeView, setActiveView] = useState("users");
  const [paymentStatus, setPaymentStatus] = useState({});

  let idToken = null;
  try {
    const storedAuth = localStorage.getItem(
      "@@auth0spajs@@::8KX5NG5JLM5pdOJYuYkFZTRGtOs53t2v::@@user@@"
    );
    if (storedAuth) {
      const idTokenObject = JSON.parse(storedAuth);
      idToken = idTokenObject.id_token;
    }
  } catch (err) {
    console.error("Error recuperando id_token:", err);
  }

  useEffect(() => {
    const initialStatus = {};
    users.forEach((user) => {
      initialStatus[user.id] =
        user.membershipType !== "sinMembresia" ? "pagado" : "pendiente";
    });
    setPaymentStatus(initialStatus);
  }, [users]);

  const handlePaymentStatus = (userId) => {
    setPaymentStatus((prev) => ({
      ...prev,
      [userId]: prev[userId] === "pagado" ? "pendiente" : "pagado",
    }));
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (!idToken) {
          setError("No se encontró el token de autenticación");
          return;
        }
        await dispatch(fetchUsers(idToken));
      } catch (err) {
        setError("Error cargando usuarios");
      }
    };
    loadUsers();
  }, [dispatch, idToken]);

  // useEffect(() => {
  //   dispatch(webhookJotform());
  // }, []);

  const handleRoleUpdate = async (userId, membershipType) => {
    const originalUser = users.find((u) => u.id === userId);

    dispatch({
      type: "UPDATE_USER_ROLE_OPTIMISTIC",
      payload: { userId, membershipType },
    });

    try {
      if (!idToken) {
        setError("No se encontró el token de autenticación");
        return;
      }
      await dispatch(updateUserRole(userId, membershipType, idToken));
      setSuccess(`Rol actualizado correctamente`);
      await dispatch(fetchUsers(idToken));
    } catch (err) {
      dispatch({
        type: "UPDATE_USER_ROLE_OPTIMISTIC",
        payload: { userId, membershipType: originalUser.membershipType },
      });
      setError("Error al actualizar el rol");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      if (!idToken) {
        setError("No se encontró el token de autenticación");
        return;
      }
      await dispatch(deleteUser(userId, idToken));
      setSuccess(`Usuario eliminado correctamente`);
      await dispatch(fetchUsers(idToken));
    } catch (err) {
      setError("Error al eliminar el usuario");
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "users":
        return (
          <Table striped bordered hover responsive className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Código Postal</th>
                <th>Rol</th>
                <th>Premium</th>
                <th>Gestor</th>
                <th>Sin Membresía</th>
                <th>Estado</th>
                <th>Creado en</th>
                <th>Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.postalCode}</td>
                  <td>{user.membershipType}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={user.membershipType === "premium"}
                      onChange={() => handleRoleUpdate(user.id, "premium")}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={user.membershipType === "gestor"}
                      onChange={() => handleRoleUpdate(user.id, "gestor")}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={user.membershipType === "sinMembresia"}
                      onChange={() => handleRoleUpdate(user.id, "sinMembresia")}
                    />
                  </td>
                  <td className="status-cell">
                    <span
                      className={`status-label ${
                        user.membershipType !== "sinMembresia"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {user.membershipType !== "sinMembresia"
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={
                        user.createdAt
                          ? new Date(user.createdAt).toISOString().split("T")[0]
                          : new Date().toISOString().split("T")[0]
                      }
                      className="date-input"
                    />
                  </td>
                  <td
                    className={`payment-status ${
                      paymentStatus[user.id] === "pagado" ? "paid" : "pending"
                    }`}
                    onClick={() => handlePaymentStatus(user.id)}
                  >
                    {paymentStatus[user.id] === "pagado"
                      ? "PAGADO"
                      : "PENDIENTE"}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      default:
        return (
          <Alert variant="info">
            Selecciona una sección del menú para comenzar
          </Alert>
        );
    }
  };
  return <Container fluid>{renderActiveView()}</Container>;
};

export default Dashboard;
