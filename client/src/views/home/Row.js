import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Row.css';
import moviesReq from '../../axios';

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const request = await moviesReq.get(fetchUrl);
            setMovies(request.data.results);
            
            setLoading(false);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    if(movies.length === 0) return <></>;
    // if(loading) console.log(`Loading : ${title}`)
    return (
    <div className="row">
        <h2>{title}</h2>

        <div className="row_poster_container">
            {movies.map(movie => {
                if(isLargeRow && !movie.poster_path) return;
                else if(!isLargeRow && !movie.backdrop_path) return;
                return (<img onClick={() => {
                    navigate(`/detail/${(movie?.media_type || "movie")}/${movie?.id}`);
                }}
                    key={movie.id} 
                    className={`row_poster ${isLargeRow && "row_poster_large"}`} 
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} 
                />)
            })}
        </div>
    </div>
    )
}
