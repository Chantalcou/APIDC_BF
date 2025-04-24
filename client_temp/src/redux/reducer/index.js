import {
  REGISTER_USER,
  SET_ERROR,
  UPDATE_CURRENT_USER,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE,
  DELETE_USER_ERROR,
  FETCH_USERS_SUCCESS_NOT_ADMIN,
  UPDATE_USER_ROLE_FAILURE,
  SET_USERS_FROM_STORAGE,
  VERIFICAR_SOCIO_SUCCESS,
  VERIFICAR_SOCIO_FAIL,
  DELETE_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  SEND_FORM_SUCCESS,
  SEND_FORM_FAILURE,
} from "../actions_types";

const initialState = {
  userFromRedux: {},
  isAuthenticated: false,
  isAdmin: false,
  allNotAdmins: [],
  users: [],
  user: {},
  error: null,
  isSocioVerified: null,
  isSocio: {},
  jotformSubmissions: [], // nuevo
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        users: action.payload.users,
        userFromRedux: action.payload.user,
        error: null,
      };

    case FETCH_USERS_SUCCESS_NOT_ADMIN:
      return {
        ...state,
        getAllNotAdmin: action.payload,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: Array.isArray(action.payload) ? action.payload : [], // Forzar a que sea array
        error: null,
      };
    case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, membershipType: action.payload.membershipType }
            : user
        ),
        userFromRedux:
          state.userFromRedux && state.userFromRedux.id === action.payload.id
            ? {
                ...state.userFromRedux,
                membershipType: action.payload.membershipType,
              }
            : state.userFromRedux,
      };

    case UPDATE_USER_ROLE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_USER_ROLE:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? { ...user, membershipType: action.payload.membershipType }
            : user
        ),
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        userFromRedux: action.payload, // Actualizar userFromRedux aquí
      };

    case SET_USERS_FROM_STORAGE:
      return {
        ...state,
        // Actualizamos la lista de usuarios
        users: action.payload,
      };
    case VERIFICAR_SOCIO_SUCCESS:
      return {
        ...state,
        isSocioVerified: action.payload,
        isSocio: action.socio,
      };
    case VERIFICAR_SOCIO_FAIL:
      return {
        ...state,
        isSocioVerified: false, // En caso de fallo, lo marcamos como false
        error: action.payload, // Guardamos el mensaje de error si es necesario
      };
    // DELETE USER
    // Agrega estos nuevos casos al switch

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };

    case DELETE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        users: [...state.users], // Mantiene los usuarios actuales
      };

    // case GET_JOTFORM_SUBMISSIONS_SUCCESS:
    //   return {
    //     ...state,
    //     jotformSubmissions: action.payload,
    //     error: null,
    //   };

    // CHATBOT
    case SEND_FORM_SUCCESS:
      return {
        ...state,
        chatbotReply: action.payload.reply, // Guardamos la respuesta del bot en el estado
      };

    case SEND_FORM_FAILURE:
      return {
        ...state,
        error: action.payload, // Guardamos el error en caso de fallo
      };
    default:
      return state;
  }
};

export default reducer;
