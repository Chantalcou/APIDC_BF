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
  userFromRedux: {},
  isAuthenticated: false,
  isAdmin: false,
  users: [],
  user: {},
  error: null,
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
      case UPDATE_USER_ROLE_SUCCESS:
        return {
          ...state,
          users: state.users.map(user => 
            user.id === action.payload.id 
              ? { ...user, membershipType: action.payload.membershipType } 
              : user
          ),
          userFromRedux: 
            state.userFromRedux.id === action.payload.id
              ? { ...state.userFromRedux, membershipType: action.payload.membershipType }
              : state.userFromRedux
        };
  

    // case UPDATE_USER_ROLE_SUCCESS:
    //   return {
    //     ...state,
    //     users: state.users.map((u) =>
    //       u.id === action.payload.id
    //         ? { ...u, membershipType: action.payload.membershipType }
    //         : u
    //     ),
    //     userFromRedux: action.payload,  // Aquí estamos sobreescribiendo completamente `userFromRedux`
    //   };

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
  

    default:
      return state;
  }
};

export default reducer;
