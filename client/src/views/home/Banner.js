import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Banner.css'
import { tmdbReq, backendReq } from '../../axios';
import requests from '../../request';

function Banner() {
    const [movie, setMovie] = useState({});
    var [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const TMDB_API_KEY = "3009bec8852b6cc29e106aa02959390b";
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const req1 = await backendReq.get(requests.fetchActionMovies);
            const movieIds = req1.data.result;
            var idx = Math.floor(Math.random() * movieIds.length - 1)
            if(idx < 0) idx = 0;
            
            const req2 = await tmdbReq.get(`https://api.themoviedb.org/3/movie/${movieIds[idx]}?api_key=${TMDB_API_KEY}`);
            setMovie(req2.data);

            setLoading(false);
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    if(loading) return <div className="banner"></div>;
    return (
        <header className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }} >
            <div className="banner_contents">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner_button_container">
                    <button className="banner_button" onClick={() => {
                        navigate(`/stream/${(movie?.media_type || "movie")}/${movie?.id}`);
                    }} >Play</button>
                    <button className="banner_button" onClick={() => {
                        navigate(`/detail/${(movie?.media_type || "movie")}/${movie?.id}`);
                    }} >Details</button>
                </div>

                <h1 className="banner_description">
                    { truncate(movie?.overview, 150) }
                </h1>
            </div>

            <div className="banner_fadeBottom" />
        </header>
    )
}

export default Banner