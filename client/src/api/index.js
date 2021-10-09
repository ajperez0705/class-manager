import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);

// export const createPost = (newPost) => {
//   console.log(newPost.title);

//   axios
//     .post(url, {
//       title: newPost.title,
//       message: newPost.message,
//     })
//     .then(function (response) {})
//     .catch(function (error) {
//       console.log(error);
//     });
// };
