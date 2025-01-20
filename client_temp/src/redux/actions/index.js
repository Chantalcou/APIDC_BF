// import { REGISTER_USER, SET_ERROR, SUBMIT_FORM } from "../actions_types";
// import axios from "axios";

// // Acción para registrar al usuario usando Axios
// export const registerUser = (userData, token) => {
//   return async (dispatch) => {
//     try {
//       // Petición POST al endpoint de registro
//       const response = await axios.post(
//         "http://localhost:5001/register",
//         {
//           email: userData.email,
//           name: userData.name,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const { user } = response.data;

//       console.log(response.data, "esto me deberia devovler todos los users");
//       // Despachamos la acción de Redux con los datos del usuario
//       dispatch({
//         type: REGISTER_USER,
//         payload: response.data.userAmin.isAdmin,
//         allUsers: response.data.users,
//       });

//       // Guardamos si el usuario es admin en el localStorage
//       localStorage.setItem("isAdmin", user.isAdmin);

//       // Aquí se puede manejar cualquier lógica adicional, como redirigir al usuario
//     } catch (error) {
//       console.error("Error registrando usuario:", error);
//       dispatch({
//         type: SET_ERROR,
//         payload: error.message,
//       });
//     }
//   };
// };

// // export const registerUser = (userData, token) => {
// //   return async (dispatch) => {
// //     try {

// //       const response = await axios.post(
// //         "http://localhost:5001/register",
// //         {
// //           email: userData.email,
// //           name: userData.name,
// //         },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const { user } = response.data;

// //       dispatch({
// //         type: REGISTER_USER,
// //         payload: user,
// //       });

// //       localStorage.setItem("isAdmin", user.isAdmin);

// //     } catch (error) {
// //       console.error("Error registrando usuario:", error);
// //       dispatch({
// //         type: SET_ERROR,
// //         payload: error.message,
// //       });
// //     }
// //   };
// // };

// // Acción para enviar los datos del formulario al backend
// export const formInfo = (formData) => async (dispatch) => {
//   try {
//     console.log(formData, "AKA ESTA LA DATA QUE VOY A ENVIAR");
//     // Enviar los datos al backend
//     const response = await axios.post(
//       "http://localhost:5001/send/admin",
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json", // Si envías un archivo también
//         },
//       }
//     );

//     // Respuesta exitosa
//     dispatch({
//       type: "FORM_INFO_SUCCESS",
//       payload: response.data, // Lo que devuelva el backend
//     });
//     console.log(response.data, "RESPUESTA DE MI BACKEND");
//   } catch (error) {
//     // Manejo de errores
//     dispatch({
//       type: "FORM_INFO_FAILURE",
//       payload: error.response ? error.response.data : "Error en la solicitud",
//     });
//   }
// };

// export const fetchUsers = (token) => {
//   return async (dispatch) => {
//     try {
//       console.log("Token enviado en fetchUsers:", token); // Verifica el token aquí
//       const response = await axios.get("http://localhost:5001/users", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Token de autenticación
//         },
//       });

//       dispatch({
//         type: "FETCH_USERS_SUCCESS",
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error("Error obteniendo usuarios:", error);
//       dispatch({
//         type: SET_ERROR,
//         payload: error.message,
//       });
//     }
//   };
// };

import { REGISTER_USER, SET_ERROR, SUBMIT_FORM } from "../actions_types";
import axios from "axios";

// Dirección base de tu API en producción
// const API_URL = "https://apidc-bf-2.onrender.com";
const API_URL = process.env.REACT_APP_API_URL_DESARROLLO;
console.log(API_URL, "APIURL");
// Acción para registrar al usuario usando Axios
export const registerUser = (userData, token) => {
  return async (dispatch) => {
    try {
      // Petición POST al endpoint de registro
      const response = await axios.post(
        `${API_URL}/register`,
        {
          email: userData.email,
          name: userData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { user } = response.data;
      console.log(user, "USER EN EL ACTIONS");
      // Despachamos la acción de Redux con los datos del usuario
      dispatch({
        type: REGISTER_USER,
        payload: response.data.userAdmin.isAdmin || null,
        allUsers: response.data.users,
      });

      // Guardamos si el usuario es admin en el localStorage
      localStorage.setItem("isAdmin", user.isAdmin);

      // Aquí se puede manejar cualquier lógica adicional, como redirigir al usuario
    } catch (error) {
      console.error("Error registrando usuario:", error);
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
};

// Acción para enviar los datos del formulario al backend
export const formInfo = (formData) => async (dispatch) => {
  try {
    // Enviar los datos al backend
    const response = await axios.post(
      `${API_URL}/send/admin`, // Actualiza la URL
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
    console.log(response.data, "RESPUESTA DE MI BACKEND");
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
      console.log("Token enviado en fetchUsers:", token); // Verifica el token aquí
      const response = await axios.get(`${API_URL}/users`, {
        // Actualiza la URL
        headers: {
          Authorization: `Bearer ${token}`, // Token de autenticación
        },
      });

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
