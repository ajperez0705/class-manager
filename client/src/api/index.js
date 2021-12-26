import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Helps the Auth middleware
// Happens before all requests. Sends the token back to backend to validate
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // Grabs the token from
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// Posts
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (finalComment, id) =>
  API.post(`/posts/${id}/commentPost`, { finalComment });

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData, avatar) => API.post("/user/signup", formData);

// Users / Students
export const fetchStudents = () => API.get("/user/class");
export const updateStudentPoints = (id, student) =>
  API.patch(`/user/${id}`, student);
export const purchaseTrophy = (id, student) =>
  API.patch(`/user/${id}/trophy`, student);
