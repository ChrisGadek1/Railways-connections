import React from 'react';
import { Link } from "react-router-dom";

import './NavButton.css'
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";

type propsType = {
    name: string,
    url: string,
    id: number
}

const NavButton = ({ name, url, id } : propsType) => {

    const mobileAnimation = useSelector((store: RootState) => store.mobileAnimation)

    return (
        <li className={mobileAnimation.mobileAnimation ? "menu-element active-menu" : "menu-element hidden-menu"}
            id={"menu-element-"+id}
        >
            <Link className="menu-link" to={url}>{name}</Link>
        </li>

    );
}

export default NavButton;