import axios from "axios";

export const tmdbReq = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export const backendReq = axios.create({
    // baseURL: "http://ec2-13-233-179-223.ap-south-1.compute.amazonaws.com/",
    baseURL: "http://localhost:8000/",
});

export default backendReq;