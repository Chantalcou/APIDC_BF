// import React, { useEffect, useState } from "react";
// import { Table, Container, Alert } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserRole, fetchUsers } from "../redux/actions/index";
// import { useAuth0 } from "@auth0/auth0-react"; // Importa useAuth0
// import "./Dashboard.css";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { users = [] } = useSelector((state) => state);
//   const { user, getAccessTokenSilently } = useAuth0(); // Obtén el usuario y el token
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const token = await getAccessTokenSilently(); // Obtén el token
//         await dispatch(fetchUsers(token)); // Pasa el token a fetchUsers
//       } catch (err) {
//         setError("Error cargando usuarios");
//       }
//     };
//     loadUsers();
//   }, [dispatch, getAccessTokenSilently]); // Agrega getAccessTokenSilently como dependencia

//   const handleRoleUpdate = async (userId, membershipType) => {
//     const originalUser = users.find((u) => u.id === userId);

//     // Actualización optimista
//     dispatch({
//       type: "UPDATE_USER_ROLE_OPTIMISTIC",
//       payload: { userId, membershipType },
//     });

//     try {
//       const token = await getAccessTokenSilently(); // Obtén el token
//       console.log(token, "token");
//       await dispatch(updateUserRole(userId, membershipType, token)); // Pasa el token
//       setSuccess(`Rol actualizado correctamente`);

//       // Recarga los usuarios desde el backend
//       await dispatch(fetchUsers(token)); // Pasa el token
//     } catch (err) {
//       // Revertir en caso de error
//       dispatch({
//         type: "UPDATE_USER_ROLE_OPTIMISTIC",
//         payload: { userId, membershipType: originalUser.membershipType },
//       });
//       setError("Error al actualizar el rol");
//     }
//   };

//   return (
//     <Container>
//       <div className="content-dashboard">
//         <h1>Dashboard de Administración</h1>
//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">{success}</Alert>}
//         <Table striped bordered hover responsive="sm" className="table-responsive">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Nombre</th>
//               <th>Email</th>
//               <th>Rol Actual</th>
//               <th>Socio Premium</th>
//               <th>Socio Gestor</th>
//               <th>Sin Membresía</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.membershipType}</td>
//                 <td style={{ textAlign: "center" }}>
//                   <input
//                     type="checkbox"
//                     checked={user.membershipType === "premium"}
//                     onChange={() => handleRoleUpdate(user.id, "premium")}
//                   />
//                 </td>
//                 <td style={{ textAlign: "center" }}>
//                   <input
//                     type="checkbox"
//                     checked={user.membershipType === "gestor"}
//                     onChange={() => handleRoleUpdate(user.id, "gestor")}
//                   />
//                 </td>
//                 <td style={{ textAlign: "center" }}>
//                   <input
//                     type="checkbox"
//                     checked={user.membershipType === "sinMembresia"}
//                     onChange={() => handleRoleUpdate(user.id, "sinMembresia")}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Container>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";
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

  return (
    <Container>
      <div className="content-dashboard">
        <h1>Dashboard de Administración</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Table striped bordered hover responsive="sm" className="table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol Actual</th>
              <th>Socio Premium</th>
              <th>Socio Gestor</th>
              <th>Sin Membresía</th>
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
                <td style={{ textAlign: "center" }}>
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
      </div>
    </Container>
  );
};

export default Dashboard;
