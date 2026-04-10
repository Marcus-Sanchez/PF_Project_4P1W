import axios from "axios";

export const authApi = axios.create({
    baseURL: "https://localhost:7227/api"
});

export const resourceApi = axios.create({
    baseURL: "https://localhost:7023/api"
});