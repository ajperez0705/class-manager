import {
  COMMENT,
  CREATE,
  DELETE,
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
      return {
        ...posts,
        posts: posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };

    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    default:
      return posts;
  }
};

export default posts;
