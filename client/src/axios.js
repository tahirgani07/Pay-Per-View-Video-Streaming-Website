import axios from "axios";

export const tmdbReq = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export const backendReq = axios.create({
    baseURL: "http://localhost:8000/",
});

export default backendReq;