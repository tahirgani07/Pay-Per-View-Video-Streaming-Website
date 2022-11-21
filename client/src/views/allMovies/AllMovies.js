import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import backendReq, { tmdbReq } from '../../axios';
import useSearchMoviesStore from '../../stores/searchMoviesStore';
import requests from '../../request';
import Nav from '../home/Nav';
import './AllMovies.css';

const base_url = "https://image.tmdb.org/t/p/original/";

const AllMovies = ({ directMovieIds }) => {
    const { movieType } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const TMDB_API_KEY = "3009bec8852b6cc29e106aa02959390b";
    const user = useUserStore(state => state.user);
    const searching = useSearchMoviesStore(state => state.searching);

    let fetchUrl = "";

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            if(!directMovieIds) {
                if(movieType === "trending") fetchUrl = requests.fetchTrendingMovies;
                else if(movieType === "watchlisted") fetchUrl = requests.fetchWatchlistedMovies;
                else if(movieType === "action") fetchUrl = requests.fetchActionMovies;
                else if(movieType === "comedy") fetchUrl = requests.fetchComedyMovies;
                else if(movieType === "horror") fetchUrl = requests.fetchHorrorMovies;
                else if(movieType === "romance") fetchUrl = requests.fetchRomanceMovies;
                else if(movieType === "documentary") fetchUrl = requests.fetchDocumentaries;
                
                var config = {};
                if(movieType === "watchlisted") {
                    config = {
                        params: {
                            email: user.email,
                        }
                    }
                }

                const request = await backendReq.get(fetchUrl, config);
                var movieIds = request.data.result;
                setMovies(state => []);
                movieIds.forEach(async id => {
                    const tmp = await tmdbReq.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
                    setMovies(state => [ ...state, tmp.data ]);
                });
            } else {
                var movieIds = directMovieIds.map((movie)=>movie?.id);
                setMovies(state => []);
                movieIds.forEach(async id => {
                    const tmp = await tmdbReq.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
                    setMovies(state => [ ...state, tmp.data ]);
                });
            }
            
            // console.log(movies)
            setLoading(false);
        }
        fetchData();
    }, [movieType, directMovieIds]);

    if(loading) return <></>;

    return (
    <div className="allmovies">
        {(  !directMovieIds && 
            <Nav alwaysFilled sideItemTitle={movieType==="documentary" ? "documentaries" : movieType} />
        )}
        {(  !directMovieIds ?
            <h2 className="title">All {movieType} movies</h2>
            : <h2 className="title">{ searching ? "Searching, please wait..." : `Search results (${movies.length})` }</h2>
        )}

        {
            searching ? <></> :
        ((movies.length === 0) ? <div style={{ marginLeft: "30px", marginTop: "1rem" }}> <h3>No results found.</h3> </div>
        : <div className="grid">
            {
                movies.map(movie => {
                    if(!movie.poster_path) return;
                    return (<img onClick={() => {
                        navigate(`/detail/${(movie?.media_type || "movie")}/${movie?.id}`);
                    }}
                        key={movie.id} 
                        className={`row_poster row_poster_large`} 
                        src={`${base_url}${movie.poster_path}`} alt={movie.name} 
                    />)
                })
            }
        </div>)
        }
    </div>
    )
}

export default AllMovies