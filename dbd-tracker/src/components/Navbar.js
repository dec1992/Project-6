import React from 'react'
import logo from "../images/logo.png";
import { Link } from 'react-router-dom'

const Navbar = () => {
    return <Link to="/" id="navbar">
        <img id="navlogo" src={logo}></img>
        <p className="has-text-link" id="stattitle"> Dead By Daylight Stat Tracker</p>
        </Link>
}

export default Navbar