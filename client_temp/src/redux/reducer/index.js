import { REGISTER_USER, SET_ERROR } from "../actions_types";

const initialState = {
  user: null,
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
        user: action.payload,
        isAuthenticated: true,
        isAdmin: action.payload,
        users: action.allUsers,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
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
