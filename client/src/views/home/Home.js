import React from 'react'
import Row from './Row'
import Banner from './Banner'
import '../../App.css';
import Nav from './Nav';
import requests from '../../request';

export default function Home() {
  return (
    <div className="home">
        <Nav isHomePage />
        <Banner />

        <Row title="Trending" fetchUrl={requests.fetchTrending} isLargeRow />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        
    </div>
  )
}
