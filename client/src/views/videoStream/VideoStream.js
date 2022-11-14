import React, { useState, useEffect, createRef, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import moviesReq, { backendReq } from '../../axios';
import './VideoStream.css';
import Nav from '../home/Nav';
import userStore from '../../stores/userStore';

function VideoStream() {
  const { mediaType, id } = useParams();
  const API_KEY = "3009bec8852b6cc29e106aa02959390b";
  const [movie, setMovie] = useState();
  var [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const user = userStore(state => state.user);
  const playedRef = useRef(played);
  const movieRef = useRef(movie);

  useEffect(() => { playedRef.current = played })

  useEffect(() => {
      async function getData() {
          setLoading(true);
          const request = await moviesReq.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}`);
          setMovie((curMovie) => {
            movieRef.current = request.data;
            return request.data;
          });

          setLoading(false);
          return request;
      }
      getData();

      const unloadCallback = async (event) => {
        event.preventDefault();
        event.returnValue = "";
        console.log("PLAYED - " + playedRef.current);
        var title = movieRef.current.title;
        if(!title) title = movieRef.current.name;
        if(!title) title = movieRef.current.original_name;
        console.log(movieRef.current)
        await backendReq.post("/bill/add", {
          email: user.email,
          title: title,
          watchtime: String(playedRef.current),
          year: String(new Date().getFullYear()),
          month: String(new Date().getMonth()),
        });
        setPlayed(0);
        return "";
      };
      window.addEventListener("beforeunload", unloadCallback);

      return async () => {
        window.removeEventListener("beforeunload", unloadCallback);
        console.log(playedRef.current);
        var title = movieRef.current.title;
        if(!title) title = movieRef.current.name;
        if(!title) title = movieRef.current.original_name;
        console.log(movieRef.current)
        await backendReq.post("/bill/add", {
          email: user.email,
          title: title,
          watchtime: String(playedRef.current),
          year: String(new Date().getFullYear()),
          month: String(new Date().getMonth()),
        });
      };
  }, [id]);

  useEffect(() => {
    playedRef.current = played;
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
    <>
      {(user == null 
        ? <div className="notSignedIn_overlay">
          <h1>Please Sign In to continue!</h1>
        </div> : <></>)}
    
      <div className="videoStream">
        <Nav alwaysFilled />
        <div className="videoStream_contents">
          <h1 className="videoStream_title" >{(movie?.title || movie?.name || movie?.original_name)}</h1>
          <div className="player">
            <ReactPlayer
              playing={user!=null}
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
    </>
  );
}

export default VideoStream