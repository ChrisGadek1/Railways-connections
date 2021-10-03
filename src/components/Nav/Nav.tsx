import React from 'react';
import {BrowserRouter} from "react-router-dom";

import NavButton from "../NavButton/NavButton";
import './Nav.css'

const options = [
    {name: 'Strona Główna', url: '/'},
    {name: 'Przystanki', url: '/przystanki'},
    {name: 'Linie', url: '/linie'},
    {name: 'Znajdź trasę', url: 'znajdz-trase'}
]

const Nav = () => {

    const buttons = options.map(option =>
        <NavButton
            key={option.name}
            name={option.name}
            url={option.url}
        />)

    return (
        <header>
            <BrowserRouter>
                <nav>
                    <ul className="main-menu">
                        {buttons}
                    </ul>
                </nav>
            </BrowserRouter>
        </header>
    );
}

export default Nav;