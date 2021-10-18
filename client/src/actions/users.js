import * as api from "../api";

export const fetchStudents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStudents();
    console.log(data);

    dispatch({ type: "FETCH_STUDENTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
