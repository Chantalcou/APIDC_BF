import React, { useEffect, useState } from "react";
import { 
  Table, 
  Container, 
  Alert, 
  Button, 
  Row, 
  Col, 
  Card, 
  Form,
  Badge 
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole, fetchUsers, deleteUser } from "../redux/actions/index";
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
    switch(activeView) {
      case "users":
        return (
          <Table striped bordered hover responsive className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
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
                    <span className={`status-label ${
                      user.membershipType !== "sinMembresia" ? "active" : "inactive"
                    }`}>
                      {user.membershipType !== "sinMembresia" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={user.createdAt
                        ? new Date(user.createdAt).toISOString().split("T")[0]
                        : new Date().toISOString().split("T")[0]
                      }
                      className="date-input"
                    />
                  </td>
                  <td className={`payment-status ${
                    paymentStatus[user.id] === "pagado" ? "paid" : "pending"
                  }`}
                    onClick={() => handlePaymentStatus(user.id)}
                  >
                    {paymentStatus[user.id] === "pagado" ? "PAGADO" : "PENDIENTE"}
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

      case "orders":
        return (
          <Card className="section-card">
  <Card.Header className="d-flex justify-content-between align-items-center">

    <Button size="sm" onClick={() => console.log('Agregar pedido')}>
      <i className="bi bi-plus-circle me-2"></i>
      Agregar Pedido
    </Button>
  </Card.Header>
  <Card.Body>
    <Table striped bordered hover responsive className="custom-table">
      <thead>
        <tr>
          <th># Pedido</th>
          <th>Cliente</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Fecha</th>
          <th>Método de Pago</th>
          <th>Estado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3].map((item) => (
          <tr key={item}>
            <td>#P00{item}</td>
            <td>Cliente Ejemplo {item}</td>
            <td>Producto Premium {item}</td>
            <td className="text-center">{item * 2}</td>
            <td>2024-03-{15 + item}</td>
            <td>
              <Badge bg="secondary" className="payment-method">
                {item % 2 === 0 ? 'Tarjeta' : 'Transferencia'}
              </Badge>
            </td>
            <td>
              <Badge 
                bg={item % 2 === 0 ? "success" : "warning"} 
                className="status-badge"
              >
                {item % 2 === 0 ? 'Completado' : 'En proceso'}
              </Badge>
            </td>
            <td className="text-end">${(item * 199).toLocaleString()}</td>
            <td className="text-center">
              <Button variant="outline-info" size="sm" className="me-2">
                <i className="bi bi-eye"></i>
              </Button>
              <Button variant="outline-secondary" size="sm">
                <i className="bi bi-pencil"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card.Body>
</Card>
        );

      case "products":
        return (
          <Card className="section-card">
            <Card.Header>Catálogo de Productos</Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {['A', 'B', 'C'].map((item, index) => (
                    <tr key={item}>
                      <td>PROD-00{index + 1}</td>
                      <td>Producto Premium {item}</td>
                      <td>Categoría {index + 1}</td>
                      <td>$ {(index + 1) * 99}</td>
                      <td>{(index + 1) * 50}</td>
                      <td>
                        <Badge bg="success">Disponible</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );

      case "config":
        return (
          <Card className="section-card">
            <Card.Header>Configuración del Sistema</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Empresa</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ingrese nombre"
                    defaultValue="Camahub Admin"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tema de la Interfaz</Form.Label>
                  <Form.Select>
                    <option>Claro</option>
                    <option>Oscuro</option>
                    <option>Automático</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notificaciones</Form.Label>
                  <div>
                    <Form.Check 
                      type="switch"
                      id="email-notifications"
                      label="Notificaciones por Email"
                      defaultChecked
                    />
                    <Form.Check 
                      type="switch"
                      id="app-notifications"
                      label="Notificaciones en la App"
                      defaultChecked
                    />
                  </div>
                </Form.Group>

                <Button variant="primary">Guardar Cambios</Button>
              </Form>
            </Card.Body>
          </Card>
        );

      default:
        return (
          <Alert variant="info">
            Seleccione una sección del menú para comenzar
          </Alert>
        );
    }
  };

  return (
    <Container fluid>
      <Row className="main-container">
        {/* Menú Lateral */}
        <Col md={3} className="sidebar">
          <div className="menu-header">
            <h4>Camahub Admin</h4>
          </div>
          
          <Button
            variant={activeView === "users" ? "primary" : "light"}
            onClick={() => setActiveView("users")}
            className="menu-button"
          >
            👥 Miembros
          </Button>
          
          <Button
            variant={activeView === "orders" ? "primary" : "light"}
            onClick={() => setActiveView("orders")}
            className="menu-button"
          >
            📦 Pedidos
          </Button>
          
          <Button
            variant={activeView === "products" ? "primary" : "light"}
            onClick={() => setActiveView("products")}
            className="menu-button"
          >
            🛍 Productos
          </Button>
          
          <Button
            variant={activeView === "config" ? "primary" : "light"}
            onClick={() => setActiveView("config")}
            className="menu-button"
          >
            ⚙ Configuración
          </Button>
        </Col>

        {/* Contenido Principal */}
        <Col md={9} className="content-area">
          <div className="table-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <div className="view-header mb-4">
              <h2>
                {activeView === "users" && "Gestión de Miembros"}
                {activeView === "orders" && "Gestión de Pedidos"}
                {activeView === "products" && "Gestión de Productos"}
                {activeView === "config" && "Configuración del Sistema"}
              </h2>
            </div>

            {renderActiveView()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;