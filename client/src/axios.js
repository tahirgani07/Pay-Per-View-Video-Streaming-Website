import axios from "axios";

const moviesReq = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export const backendReq = axios.create({
    baseURL: "http://localhost:8000/",
});

export default moviesReq;