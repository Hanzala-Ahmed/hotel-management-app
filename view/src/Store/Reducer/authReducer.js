import ActionTypes from "../constant";

const INITIAL_STATE = {
  userData: undefined,
  userDataLoading: false,
  userDataError: "",
  userDataMessage: "",
  isSignupError: false
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQ:
      return {
        ...state,
        userDataLoading: true,
      };

    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userDataLoading: false,
        userData: action.payload.data,
        userDataMessage: action.payload.message,
      };
    case ActionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        userDataLoading: false,
        userDataError: action.payload.error,
      };
    default:
      return state;
  }
};

const SignupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.USER_SIGNUP_REQ:
      return {
        ...state,
        userDataLoading: true,
        userData:undefined,
        userDataError: "",
        userDataMessage: "",
        isSignupError: false
      };
      
      case ActionTypes.USER_SIGNUP_SUCCESS:
        // console.log(action.payload);
        return {
          ...state,
          userDataLoading: false,
          userData: action.payload,
          userDataMessage: action.payload.message,
          isSignupError: false
        };
        case ActionTypes.USER_SIGNUP_FAIL:
        console.log("action.payload errors", action.payload)
          return {
            ...state,
            userDataLoading: false,
            userDataError: action.payload._message,
            isSignupError: true
      };
    default:
      return state;
  }
};

export { LoginReducer, SignupReducer };
