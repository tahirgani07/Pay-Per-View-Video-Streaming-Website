import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Banner.css'
import moviesReq from '../../axios';
import requests from '../../request';

function Banner() {
    const [movie, setMovie] = useState({});
    var [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const request = await moviesReq.get(requests.fetchTrending);
            var idx = Math.floor(Math.random() * request.data.results.length - 1)
            if(idx < 0) idx = 0;
            setMovie(request.data.results[idx])

            setLoading(false);
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    if(loading) return <></>;
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