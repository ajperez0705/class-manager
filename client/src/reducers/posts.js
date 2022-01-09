import {
  COMMENT,
  CREATE,
  DELETE,
  DELETE_COMMENT,
  FETCH_ALL,
  UPDATE,
} from "../constants/actionTypes";

const posts = (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      // Keep all posts EXCEPT for the one where the id === action.payload
      return posts.filter((post) => post._id !== action.payload);

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case COMMENT:
      return [...posts, action.payload];

    case DELETE_COMMENT:
      // Keep all comments EXCEPT for the one where the id === action.payload
      return posts.filter((post) => post.comments._id !== action.payload);

    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    default:
      return posts;
  }
};

export default posts;
