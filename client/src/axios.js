import axios from "axios";

const moviesReq = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default moviesReq;