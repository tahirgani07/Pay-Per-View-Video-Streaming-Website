import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOverlayStore from '../../stores/overlayStore';
import useUserStore from '../../stores/userStore';
import { FaUser } from 'react-icons/fa';
import './Nav.css';

function Nav({ alwaysFilled, isHomePage }) {
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
        <h2 className="nav_logo" onClick={() => {
            if(!isHomePage)
                navigate('/');
        }}>PPU-Stream</h2>
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
                        <a onClick={signOut}>Sign Out</a>
                    </div>
                </div>
            )
        )}
    </div>
  )
}

export default Nav