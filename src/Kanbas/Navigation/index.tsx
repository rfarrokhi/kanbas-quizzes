import './index.css';
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt } from "react-icons/fa";
import { FaInbox, FaClock } from "react-icons/fa6";
import { RiSlideshow2Fill } from "react-icons/ri";
import React from "react";

function KanbasNavigation() {
    const location = useLocation();

     const links = [
         { label: "Account", icon: <FaRegUserCircle/> },
         { label: "Dashboard", icon: <FaTachometerAlt/> },
         { label: "Courses", icon: <FaBook/> },
         { label: "Calendar", icon: <FaRegCalendarAlt/> },
         { label: "Inbox", icon: <FaInbox/> },
         { label: "History", icon: <FaClock/> },
         { label: "Studio", icon: <RiSlideshow2Fill/> },
     ];

    return (
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block sidebar">
            <div className="sidebar-logo">
                <img src={require('../../Images/NE_Logo.png')} alt="Logo" width="80" />
            </div>
            <ul className="nav flex-column">
                {links.map((link, index) => (
                    <li className="nav-item" key={index}>
                        <Link
                            className={`nav-link ${location.pathname.includes(link.label) ? 'active' : ''}`}
                            to={`/Kanbas/${link.label}`}
                        >
                            {React.cloneElement(link.icon, { className: "fs-2 pas nav-icon" })} {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default KanbasNavigation;
