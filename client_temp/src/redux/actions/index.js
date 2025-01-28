import { REGISTER_USER, SET_ERROR, SUBMIT_FORM } from "../actions_types";
import axios from "axios";

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

      console.log(response.data, "esto necesito");

      // Desestructurar los datos de la respuesta
      const { userAdmin, users } = response.data;

      // Despachar acción para actualizar el estado
      dispatch({
        type: REGISTER_USER,
        payload: {
          user: userAdmin,
          isAdmin: userAdmin.isAdmin,
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

// Este formulario nos va a enviar 'Trabajemos juntos'
export const sendWorkTogether = (formData) => async (dispatch) => {
  console.log(formData, "form data entro????");

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
      payload: response.data, // Aquí puedes enviar una respuesta que diga "correo enviado"
    });
  } catch (error) {
    dispatch({
      type: "SEND_FORM_FAIL",
      payload: error.response ? error.response.data : "Error desconocido",
    });
  }
};
