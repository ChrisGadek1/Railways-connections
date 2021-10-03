import React from 'react';
import { Link } from "react-router-dom";

import './NavButton.css'

type propsType = {
    name: string,
    url: string,
    id: number
}

const NavButton = ({ name, url, id } : propsType) => {

    const style = {
        top: `${id*20}px`,
        animationDelay: `${id}s`
    }

    return (
        <li className={"menu-element "} id={"menu-element-"+id} style={style}>
            <Link className="menu-link" to={url}>{name}</Link>
        </li>

    );
}

export default NavButton;