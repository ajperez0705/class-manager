import * as api from "../api";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  UPDATE,
  COMMENT,
} from "../constants/actionTypes";

export const getPosts = (filter) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    let finalData;
    switch (filter) {
      case "recent":
        finalData = data.sort(function (a, b) {
          var c = new Date(a.createdAt);
          var d = new Date(b.createdAt);
          return d - c;
        });
        break;

      case "oldest":
        finalData = data.sort(function (a, b) {
          var c = new Date(a.createdAt);
          var d = new Date(b.createdAt);
          return c - d;
        });

        break;

      default:
        break;
    }

    dispatch({ type: FETCH_ALL, payload: finalData });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log(post);
    const { data } = await api.createPost(post);
    console.log(data);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // This returns the updated memory
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    // This returns the updated memory
    const { data } = await api.likePost(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (finalComment, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(finalComment, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
