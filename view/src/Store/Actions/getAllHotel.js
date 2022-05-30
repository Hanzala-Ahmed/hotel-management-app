import axios from "axios";
import BASE_URI from "../../core";
import ActionTypes from "../constant";

const GetAllHotel = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.USER_LOGIN_REQ,
    });
    axios
    .get(`${BASE_URI}user/hotel`)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error)
    })
}
};

export {GetAllHotel}