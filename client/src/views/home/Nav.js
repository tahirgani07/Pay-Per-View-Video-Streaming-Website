import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOverlayStore from '../../stores/overlayStore';
import useUserStore from '../../stores/userStore';
import useSearchMoviesStore from '../../stores/searchMoviesStore';
import { FaUser } from 'react-icons/fa';
import './Nav.css';
import Sidebar from '../sidebar/Sidebar';
import backendReq from '../../axios';
import requests from '../../request';

function Nav({ alwaysFilled, sideItemTitle, isHomePage }) {
    const [show, handleShow] = useState(alwaysFilled);
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const setSearchMode = useSearchMoviesStore(state => state.setSearchMode);
    const setSearching = useSearchMoviesStore(state => state.setSearching);
    const setSearchMovies = useSearchMoviesStore(state => state.setSearchMovies);
    const toggleShowAuthOverlay = useOverlayStore(state => state.toggleShowAuthOverlay);

    function signOut() {
        localStorage.clear();
        setUser(null);
    }

    useEffect(() => {
        const searchInput = document.querySelector(".search_input");
        searchInput?.addEventListener("keyup", onMovieSearch);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(alwaysFilled);
        });
    }, [alwaysFilled]);

    const onMovieSearch = async (e) => {
        if (e.keyCode !== 13) return;
        // Enter key pressed
        if(e.target.value.trim() === "") return;

        const searchTxt = e.target.value.trim();

        if(searchTxt.length < 3) {
            alert("Please enter a string of length 3 atleast.");
            return;
        }
        
        setSearchMode(true);
        setSearching(true);
        const request = await backendReq.get(requests.searchAllMovies, {
            params: {
                searchTxt: searchTxt,
            }
        });
        
        setSearchMovies(request?.data?.result);
        setSearching(false);
    };
    return (
        <div className={`nav ${show && "nav_filled"}`}>
            {/* <img className="nav_logo" src="" alt="" />
            <img className="nav_avatar" src="" alt="" /> */}
            <div className="sidebar_container">
                <Sidebar sideItemTitle={sideItemTitle} />
                <h2 className="nav_logo" onClick={() => {
                    setSearchMode(false);
                    if(!isHomePage)
                        navigate('/');
                }}>StreamMix</h2>
            </div>
            <div className="nav_right_container">
                    { isHomePage && <input onSubmit={onMovieSearch} type="text" name="searchTxt" className="search_input" placeholder="Search movies..." /> }
            {(
                    (user == null)  
                    ? <button className="nav_button_signIn" onClick={() => {
                        toggleShowAuthOverlay();
                    }}>Sign In</button>
                    : (
                        <div className="dropdown">
                            <button className="dropbtn">
                                <div className="nav_user_details">
                                    <FaUser />
                                    <div className="nav_userName">{user.name}</div>
                                </div>
                            </button>
                            <div className="dropdown-content">
                                <a onClick={() => { navigate("/movies/all/watchlisted"); }}>
                                    Watchlist</a>
                                <a onClick={() => { navigate("/billing_dashboard"); }}>
                                    Bills</a>
                                <a onClick={signOut}>Sign Out</a>
                            </div>
                        </div>
                    )
            )}
            </div>
        </div>
    )
}

export default Nav