import * as api from "../api";
import {
  FETCH_STUDENTS,
  PURCHASE_TROPHY,
  UPDATE_STUDENT,
} from "../constants/actionTypes";

export const fetchStudents = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStudents();

    dispatch({ type: FETCH_STUDENTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStudentPoints = (id, student) => async (dispatch) => {
  try {
    const { data } = await api.updateStudentPoints(id, student);

    dispatch({ type: UPDATE_STUDENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const purchaseTrophy = (id, student) => async (dispatch) => {
  try {
    const { data } = await api.purchaseTrophy(id, student);

    dispatch({ type: PURCHASE_TROPHY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
