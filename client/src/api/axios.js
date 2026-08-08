import axios from "axios";

// create axios-instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export default api;
