import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import moviesReq from '../../axios';
import './VideoStream.css';
import Nav from '../home/Nav';

function VideoStream() {
  const { mediaType, id } = useParams();
    const API_KEY = "3009bec8852b6cc29e106aa02959390b";
    const [movie, setMovie] = useState();
    var [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);

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

    useEffect(() => {
      timer();
    }, [isPlaying, played]);

    function timer() {
      // console.log("INSIDE TIMER: " + isPlaying);
      if(!isPlaying) return;
      setTimeout(() => {
        setPlayed(played + 1);
        // console.log(played);
      }, 1000);
    }

    var imgSrc = `https://image.tmdb.org/t/p/original/${(movie?.backdrop_path || movie?.poster_path)}`;
    
    if(loading) return <></>;
    return (
      <div className="videoStream">
        <Nav alwaysFilled />
        <div className="videoStream_contents">
          <h1 className="videoStream_title" >{(movie?.title || movie?.name || movie?.original_name)}</h1>
          <div className="player">
            <ReactPlayer
              playing={true}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              url="http://localhost:8000/video/stream/1"
              pip={false}
              // stopOnUnmount={false}
              height='500px' 
              width='90%'
              controls={true}
              light={imgSrc} />
          </div>
        </div>
      </div>
    );
}

export default VideoStream