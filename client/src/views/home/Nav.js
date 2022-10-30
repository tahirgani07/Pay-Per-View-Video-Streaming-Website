import React from 'react'
import { useState, useEffect } from 'react';
import './Nav.css';

function Nav({ alwaysFilled }) {
    const [show, handleShow] = useState(alwaysFilled);

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
        <h2 className="nav_logo">PPU-Stream</h2>
        <button className="button_signIn">Sign In</button>
    </div>
  )
}

export default Nav