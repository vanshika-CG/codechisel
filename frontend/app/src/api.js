import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" }); // Change this if your backend is hosted elsewhere

API.defaults.withCredentials = true; // Send cookies (sessions)

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const logoutUser = () => API.post("/auth/logout");
export const checkAuth = () => API.get("/protected");
