import { combineReducers } from "redux";
import { LoginReducer, SignupReducer } from "./authReducer";

const rootReducer = combineReducers({
  LoginReducer,
  SignupReducer,
});

export default rootReducer;