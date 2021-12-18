const users = (users = [], action) => {
  switch (action.type) {
    case "FETCH_STUDENTS":
      return action.payload;

    case "UPDATE_STUDENT":
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );

    default:
      return users;
  }
};

export default users;
