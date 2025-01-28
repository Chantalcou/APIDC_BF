import { REGISTER_USER, SET_ERROR } from "../actions_types";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  users: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case REGISTER_USER:
      console.log(action, "reducer");
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        users: action.payload.users,
        error: null,
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
