import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOverlayStore from '../../stores/overlayStore';
import useUserStore from '../../stores/userStore';
import { FaUser } from 'react-icons/fa';
import './Nav.css';
import Sidebar from '../sidebar/Sidebar';

function Nav({ alwaysFilled, sideItemTitle, isHomePage }) {
    const [show, handleShow] = useState(alwaysFilled);
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const toggleShowAuthOverlay = useOverlayStore(state => state.toggleShowAuthOverlay);

    function signOut() {
        localStorage.clear();
        setUser(null);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(alwaysFilled);
        });
    }, [alwaysFilled]);

  return (
    <div className={`nav ${show && "nav_filled"}`}>
        {/* <img className="nav_logo" src="" alt="" />
        <img className="nav_avatar" src="" alt="" /> */}
        <div className="sidebar_container">
            <Sidebar sideItemTitle={sideItemTitle} />
            <h2 className="nav_logo" onClick={() => {
                if(!isHomePage)
                    navigate('/');
            }}>StreamMix</h2>
        </div>
        
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
                        <a onClick={
                                () => {
                                    navigate("/movies/all/watchlisted");
                                }
                        }>Watchlist</a>
                        <a onClick={
                                () => {
                                    navigate("/billing_dashboard");
                                }
                        }>Bills</a>
                        <a onClick={signOut}>Sign Out</a>
                    </div>
                </div>
            )
        )}
    </div>
  )
}

export default Nav