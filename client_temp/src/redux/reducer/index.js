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
  getAllNotAdmin: [],
  users: [],
  user: {},
  error: null,
  isSocioVerified: null,
  isSocio: {},
  jotformSubmissions: [],
  chatbotReply: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user || {},
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin || false,
        users: Array.isArray(action.payload.users) ? action.payload.users : state.users,
        userFromRedux: action.payload.user || {},
        error: null,
      };

    case FETCH_USERS_SUCCESS_NOT_ADMIN:
      return {
        ...state,
        getAllNotAdmin: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: Array.isArray(action.payload) ? action.payload : [],
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
        getAllNotAdmin: state.getAllNotAdmin.map((user) =>
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
        error: null,
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
        getAllNotAdmin: state.getAllNotAdmin.map((user) =>
          user.id === action.payload.userId
            ? { ...user, membershipType: action.payload.membershipType }
            : user
        ),
      };

    case UPDATE_CURRENT_USER:
      return {
        ...state,
        userFromRedux: action.payload || {},
      };

    case SET_USERS_FROM_STORAGE:
      return {
        ...state,
        users: Array.isArray(action.payload) ? action.payload : [],
      };

    case VERIFICAR_SOCIO_SUCCESS:
      return {
        ...state,
        isSocioVerified: action.payload,
        isSocio: action.socio || {},
        error: null,
      };

    case VERIFICAR_SOCIO_FAIL:
      return {
        ...state,
        isSocioVerified: false,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        getAllNotAdmin: state.getAllNotAdmin.filter((user) => user.id !== action.payload),
        error: null,
      };

    case DELETE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SEND_FORM_SUCCESS:
      return {
        ...state,
        chatbotReply: action.payload?.reply || "",
        error: null,
      };

    case SEND_FORM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;