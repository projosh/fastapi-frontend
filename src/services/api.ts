import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // adapte selon ton backend
});

export const getLogs = (params: any) => API.get("/logs/search", { params });
export const postLog = (log: any) => API.post("/logs", log);
