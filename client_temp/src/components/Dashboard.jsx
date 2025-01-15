import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/actions/index";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state); // Extraemos los usuarios del estado
  const [userStatus, setUserStatus] = useState({}); // Estado para gestionar el status de pago o socio

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Asegúrate de almacenar el token en el login
    dispatch(fetchUsers(token)); // Obtén los usuarios al cargar el componente
  }, [dispatch]);

  const handleCheckboxChange = (userId, statusType) => {
    setUserStatus((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [statusType]: !prevState[userId]?.[statusType], // Cambia el estado del checkbox
      },
    }));
  };

  return (
    <div className="container-dashboard">
      <h2 className="text-center mb-4">Dashboard de Usuarios</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Socio</th>
            <th>Pago Realizado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
              {/* Aquí agregamos los checkboxes para el estado de pago y socio */}
              <td>
                <input
                  type="checkbox"
                  checked={userStatus[user.id]?.isMember || false} // Verificamos si el usuario es socio
                  onChange={() => handleCheckboxChange(user.id, "isMember")}
                  style={{
                    backgroundColor: userStatus[user.id]?.isMember ? "green" : "gray", // Color verde si es socio
                  }}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={userStatus[user.id]?.hasPaid || false} // Verificamos si el usuario ha pagado
                  onChange={() => handleCheckboxChange(user.id, "hasPaid")}
                  style={{
                    backgroundColor: userStatus[user.id]?.hasPaid ? "green" : "gray", // Color verde si ha pagado
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
