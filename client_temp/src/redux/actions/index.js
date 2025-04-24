import axios from "axios";
import {
  REGISTER_USER,
  SET_ERROR,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILURE,
  VERIFICAR_SOCIO_SUCCESS,
  FETCH_USERS_SUCCESS,
  SEND_FORM_FAILURE,
  FETCH_USERS_SUCCESS_NOT_ADMIN,
} from "../actions_types";

export const registerUser = (userData, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://apidc.ong/register",
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
      console.log(isAdmin, "ACA DEBERIA LLEGARME TRUE, ESTAMOS EN EL ACTIONS");
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
      "https://apidc.ong/send/admin",

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

// // Acción para actualizar el rol de un usuario
// export const updateUserRole = (userId, membershipType, token) => {
//   const id = userId.id;
//   return async (dispatch) => {
//     try {
//       const response = await axios.put(
//         `https://apidc.ong/users/${userId}`,
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

// Acción para obtener usuarios
export const fetchUsers = (token) => {
  return async (dispatch) => {
    try {
      // usersNotAdmin
      const response = await axios.get(`https://apidc.ong/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Token de autenticación
        },
      });
      console.log(response, "ME DEVUELVE ALGO CUANDO ENTRO AL DASHBARD?");
      dispatch({
        type: FETCH_USERS_SUCCESS,
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

// Acción para obtener usuarios
export const getAllNotAdmins = (token) => {
  return async (dispatch) => {
    try {
      // usersNotAdmin
      const response = await axios.get(
        `https://apidc.ong/usersNotAdmin`,
        {}
      );

      dispatch({
        type: FETCH_USERS_SUCCESS_NOT_ADMIN,
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

export const updateUserRole = (userId, membershipType, token) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        `https://apidc.ong/users/${userId}`,
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
      "https://apidc.ong/workWithUs",

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

export const verifySocio = (email, id_socio) => async (dispatch) => {
  try {
    const response = await axios.post(`https://apidc.ong/verifySocio`, {
      email,
      id_socio,
    });
    console.log("Respuesta del servidor:", response.data);

    if (response.data.success) {
      console.log(response);
      dispatch({
        type: VERIFICAR_SOCIO_SUCCESS,
        payload: response.data.success,
        socio: response.data.socio,
      });
    } else {
      dispatch({
        type: "VERIFICAR_SOCIO_FAIL",
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: "VERIFICAR_SOCIO_FAIL",
      payload: error.response?.data.message || "Error desconocido",
    });
  }
};

export const deleteUser = (userId, token) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://apidc.ong/usersDelete/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar");
    }

    dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
  } catch (error) {
    dispatch({ type: "DELETE_USER_ERROR", payload: error.message });
    throw error;
  }
};


export const sendChatMessage = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("https://apidc.ong/chatbot", formData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: "SEND_FORM_SUCCESS",
      payload: response.data,
    });

    return response.data.reply; // 👈 AGREGÁ ESTA LÍNEA
  } catch (error) {
    console.error("Error en el envío del mensaje:", error);
    const errorMsg = !error.response
      ? "Error de red. Por favor, intente más tarde."
      : error.response?.data?.message || "Error desconocido";

    dispatch({
      type: SEND_FORM_FAILURE,
      payload: errorMsg,
    });

    throw new Error(errorMsg); // también importante para capturarlo en el componente
  }
};


// export const webhookJotform = () => async (dispatch) => {
//   try {
//     const response = await axios.post("https://apidc.ong/webhook-jotform");
//     console.log(response, "ESTO ME LLEGA AL ACTIONS");
//     // dispatch({
//     //   type: "SEND_FORM_SUCCESS",
//     //   payload: response.data,
//     // });
//   } catch (error) {
//     dispatch({
//       type: "SEND_FORM_FAIL",
//       payload: error.response ? error.response.data : "Error desconocido",
//     });
//   }
// };

// export const getJotformSubmissions = () => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       "https://apidc.ong/jotform-submissions"
//     );
//     console.log("Datos recibidos desde el backend:", response.data);

//     dispatch({
//       type: GET_JOTFORM_SUBMISSIONS_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: "GET_JOTFORM_SUBMISSIONS_FAIL",
//       payload: error.response ? error.response.data : "Error desconocido",
//     });
//   }
// };
