import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, setErrors, history) => async (dispatch) => {
  try {
    // Send data to backend endpoint
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (err) {
    setErrors([err.response.data.message]);
  }
};

export const signup = (formData, setErrors, history) => async (dispatch) => {
  try {
    // Send data (sign up) to backend endpoint
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (err) {
    console.log(err.response.data.errors);
    setErrors(err.response.data.errors);
  }
};
