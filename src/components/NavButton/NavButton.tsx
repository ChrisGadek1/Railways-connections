import React from 'react';
import { Link } from "react-router-dom";

import './NavButton.css'

type propsType = {
    name: string,
    url: string
}

const NavButton = ({ name, url } : propsType) => {
    return (
        <li className="menu-element">
            <Link className="menu-link" to={url}>{name}</Link>
        </li>

    );
}

export default NavButton;