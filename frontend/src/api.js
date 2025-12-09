import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// For admin routes – send role in headers
API.interceptors.request.use((req) => {
  const role = localStorage.getItem("role");
  if (role) req.headers.role = role;
  return req;
});

export default API;
