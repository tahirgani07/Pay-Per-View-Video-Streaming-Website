import React, { useState } from 'react';
import './Sidebar.css';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

const Sidebar = ({ sideItemTitle }) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(true);
    const closeSidebar = () => setSidebar(false);

    return (
        <>
            <div className="sidebar">
                <button className="menu-bars">
                    <FaBars onClick={showSidebar} />
                </button>

                <nav className={ sidebar ? "side-menu active" : "side-menu" }>
                    <ul className="side-menu-items">
                        <li className="sidebar-toggle">
                            <button className="menu-cross">
                                <AiOutlineClose onClick={closeSidebar} />
                            </button>
                        </li>
                        {
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className="side-title">
                                        <Link style={(sideItemTitle === item.title.toLocaleLowerCase()) ? {background: "#1a83ff"} : {}} to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Sidebar