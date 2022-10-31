import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import './Nav.css';

function Nav({ alwaysFilled, isHomePage }) {
    const [show, handleShow] = useState(alwaysFilled);
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);

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
            ? <button className="button_signIn" onClick={() => {
                setUser({});
            }}>Sign In</button>
            : <button className="button_signIn" onClick={() => {
                setUser(null);
            }}>Sign Out</button>
        )}
    </div>
  )
}

export default Nav