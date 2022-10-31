import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moviesReq from '../../axios';
import Nav from '../home/Nav';
import './Detail.css';

function Detail() {
    const { mediaType, id } = useParams();
    const API_KEY = "3009bec8852b6cc29e106aa02959390b";
    const [movie, setMovie] = useState();
    var [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const request = await moviesReq.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}`);
            setMovie(request.data);

            setLoading(false);
            return request;
        }
        getData();
    }, []);

    var imgSrc = `https://image.tmdb.org/t/p/original/${(movie?.backdrop_path || movie?.poster_path)}`;
    
    if(loading) return <></>;
    return (
        // <div>Detail {movie?.id} {(movie?.title || movie?.name || movie?.original_name)}</div>
        <div className="detail">
            <Nav alwaysFilled />
            <img className="bg_img" src={imgSrc} alt="" />
            <div className="detail_contents">
                <h1 className="detail_title" >{(movie?.title || movie?.name || movie?.original_name)}</h1>

                <div className="detail_information_container">
                    <h3 className="detail_information"> {movie?.vote_average && `Rating: ${String(movie?.vote_average).substring(0, 3)}`} </h3>
                    <h3 className="detail_information"> {movie?.runtime && `${movie?.runtime} min`} </h3>
                    <h3 className="detail_information"> {movie?.release_date && `${movie?.release_date.substring(0, 4)}`} </h3>
                </div>
                
                <h2 className="detail_description">
                    { movie?.overview }
                </h2>

                <div className="detail_button_container">
                    <button className="detail_button play_button" onClick={() => {
                        navigate(`/stream/${mediaType}/${id}`);
                    }}>Play</button>
                    <button className="detail_button">Watch Trailer</button>
                    <button className="detail_button">Add to Watchlist</button>
                </div>
            </div>
        </div>
    );
}

export default Detail