import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log(post);
    const res = await api.createPost(post);
    console.log(res);

    dispatch({ type: "CREATE", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
