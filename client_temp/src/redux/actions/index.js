import axios from "axios";
import {
  REGISTER_USER,
  SET_ERROR,
  SUBMIT_FORM,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILURE,
} from "../actions_types";

export const registerUser = (userData, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://apidc-bf-2.onrender.com/register",
        {
          email: userData.email,
          name: userData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const { userAdmin, users } = response.data;

      // Comprobar si userAdmin está definido antes de acceder a isAdmin
      const isAdmin = userAdmin?.isAdmin ?? false; // Si userAdmin es undefined, asigna false

      console.log(isAdmin, "esto necesito saber desde el action");

      // Despachar acción para actualizar el estado
      dispatch({
        type: REGISTER_USER,
        payload: {
          user: userAdmin,
          isAdmin: isAdmin, // Usamos la variable isAdmin que ya tiene un valor seguro
          users: users,
        },
      });
    } catch (error) {
      console.error("Error registrando usuario:", error);

      // Despachar acción de error
      dispatch({
        type: SET_ERROR,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

// Acción para enviar los datos del formulario al backend
export const formInfo = (formData) => async (dispatch) => {
  try {
    // Enviar los datos al backend
    const response = await axios.post(
      "https://apidc-bf-2.onrender.com/send/admin",

      formData,
      {
        headers: {
          "Content-Type": "application/json", // Si envías un archivo también
        },
      }
    );

    // Respuesta exitosa
    dispatch({
      type: "FORM_INFO_SUCCESS",
      payload: response.data, // Lo que devuelva el backend
    });
  } catch (error) {
    // Manejo de errores
    dispatch({
      type: "FORM_INFO_FAILURE",
      payload: error.response ? error.response.data : "Error en la solicitud",
    });
  }
};

// Acción para obtener usuarios
export const fetchUsers = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        // "https://apidc-bf-2.onrender.com/users",
        `https://apidc-bf-2.onrender.com/users`,
        {
          // Actualiza la URL
          headers: {
            Authorization: `Bearer ${token}`, // Token de autenticación
          },
        }
      );
      console.log("Usuarios obtenidos - FETCH USERS:", response.data);

      dispatch({
        type: "FETCH_USERS_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

// // Acción para actualizar el rol de un usuario
// export const updateUserRole = (userId, membershipType, token) => {
//   const id = userId.id;
//   return async (dispatch) => {
//     try {
//       const response = await axios.put(
//         `https://apidc-bf-2.onrender.com/users/${userId}`,
//         { membershipType },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(response, "actions ESTO QUIERO VER AHORA");
//       dispatch({
//         type: UPDATE_USER_ROLE_SUCCESS,
//         payload: response.data.user,
//         // memberShipType: response.data.user.membershipType,
//       });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_USER_ROLE_FAILURE,
//         payload: error.response ? error.response.data : error.message,
//       });
//     }
//   };
// };

export const updateUserRole = (userId, membershipType, token) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        `https://apidc-bf-2.onrender.com/users/${userId}`,
        { membershipType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: UPDATE_USER_ROLE_SUCCESS,
        payload: response.data.user,
      });

      // Obtener el estado actualizado y guardarlo en localStorage
      const updatedState = getState();
      localStorage.setItem("reduxState", JSON.stringify(response.data));

      console.log("Rol actualizado y guardado en localStorage", response.data);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ROLE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Este formulario nos va a enviar 'Trabajemos juntos'
export const sendWorkTogether = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://apidc-bf-2.onrender.com/send/workWithUs",

      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "SEND_FORM_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "SEND_FORM_FAIL",
      payload: error.response ? error.response.data : "Error desconocido",
    });
  }
};
