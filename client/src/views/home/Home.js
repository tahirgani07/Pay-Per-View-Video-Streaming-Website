import React from 'react'
import Row from './Row'
import Banner from './Banner'
import useSearchMoviesStore from '../../stores/searchMoviesStore';
import '../../App.css';
import Nav from './Nav';
import requests from '../../request';
import AllMovies from '../allMovies/AllMovies';

export default function Home() {
  const searchMode = useSearchMoviesStore(state => state.searchMode);
  const searchMovies = useSearchMoviesStore(state => state.searchMovies);

  return (
    <div className="home">
        <Nav isHomePage sideItemTitle="home" alwaysFilled />
        {
          (!searchMode) ?
          <>
            <div style={{ paddingTop: "80px" }}></div>
            {/* <Banner /> */}

            <Row title="Trending Movies" fetchUrl={requests.fetchTrendingMovies} isLargeRow />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} isLargeRow />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} isLargeRow />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} isLargeRow />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} isLargeRow />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} isLargeRow />
          </>
          : <div className="search_movies_container">
            <AllMovies directMovieIds={searchMovies} />
          </div>
        }
        
    </div>
  )
}
