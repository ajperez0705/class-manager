import jwt, { decode } from "jsonwebtoken";

// Will have to change the code to check if the user is the teacher or not

// Auth is a middleware that works after the client action is executed, but BEFORE it gets to the route in the backend
const auth = async (req, res, next) => {
  // Next means, do something and move on to the NEXT thing
  try {
    const token = req.headers.authorization.split(" ")[1];

    // If the token is more than 500, it means it is a google token
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      // The second arg for .verify HAS to be the same secret used when creating the user data
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      //   sub is a Google specific way to check user
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
