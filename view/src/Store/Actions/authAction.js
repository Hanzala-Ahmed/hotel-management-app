import axios from "axios";
import BASE_URI from "../../core";
import ActionTypes from "../constant";

const LoginAction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USER_LOGIN_REQ,
    });
    await axios
      .post(`${BASE_URI}user/login`, data)
      .then((res) => {
        if (res.data.error) {
          dispatch({
            type: ActionTypes.USER_LOGIN_FAIL,
            payload: res.data,
          });
        } else {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          console.log("success");
          dispatch({
            type: ActionTypes.USER_LOGIN_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.USER_LOGIN_FAIL,
          payload: err.data,
        });
      });
  };
};

const SignupAction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USER_SIGNUP_REQ,
    });
    await axios
      .post(`${BASE_URI}user/signup`, data)
      .then((res) => {
        console.log(res)
        console.log(res.data.errors)
        if (res.data.errors) {
          console.log("error");
          dispatch({
            type: ActionTypes.USER_SIGNUP_FAIL,
            payload: res.data,
          });
        }else if(res.data._message){
          dispatch({
            type: ActionTypes.USER_SIGNUP_FAIL,
            payload: res.data,
          });
        }else {
          console.log(res.data.data);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          console.log("success");
          dispatch({
            type: ActionTypes.USER_SIGNUP_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ActionTypes.USER_SIGNUP_FAIL,
          payload: err.data,
        });
        throw new Error(err.data)
      });
  };
};

export { LoginAction, SignupAction };
