import {
  REGISTER_USER,
  SET_ERROR,
  UPDATE_CURRENT_USER,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE,
  UPDATE_USER_ROLE_FAIL,
  UPDATE_USER_ROLE_FAILURE,
} from "../actions_types";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  users: [],
  error: null,
  memberShipType: "",
};

const reducer = (state = initialState, action) => {
  console.log(action.type, " esto es el reducer");
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        users: action.payload.users,
        error: null,
      };

    case UPDATE_USER_ROLE_FAIL:
      return { ...state, error: action.payload };

    case UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.user.id ? action.payload.user : user
        ),
        user:
          state.user?.id === action.payload.user.id
            ? {
                ...state.user,
                membershipType: action.payload.user.membershipType,
              }
            : state.user,
        memberShipType: action.payload.user.membershipType,
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
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
