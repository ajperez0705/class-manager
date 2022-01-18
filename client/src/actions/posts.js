import * as api from "../api";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  UPDATE,
  COMMENT,
  DELETE_COMMENT,
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
        finalData = data;
        break;
    }

    dispatch({ type: FETCH_ALL, payload: finalData });
  } catch (err) {}
};

export const createPost = (post, setErrors) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    return "success";
  } catch (err) {
    setErrors(err.response.data.errors);
    return "error";
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // This returns the updated memory
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    // This returns the updated memory
    const { data } = await api.likePost(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const commentPost = (finalComment, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(finalComment, id);

    console.log(data);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (commentID, postID) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(commentID, postID);

    dispatch({ type: DELETE_COMMENT, payload: commentID });

    return data;
  } catch (err) {
    console.log(err);
  }
};
