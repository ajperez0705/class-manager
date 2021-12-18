import * as api from "../api";

export const fetchStudents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStudents();

    dispatch({ type: "FETCH_STUDENTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStudentPoints = (id, student) => async (dispatch) => {
  try {
    const { data } = await api.updateStudentPoints(id, student);
    console.log(data);

    dispatch({ type: "UPDATE_STUDENT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
