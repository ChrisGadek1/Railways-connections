import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import { showAnimation, hideAnimation } from "../../actions/mobileAnimationActions";
import NavButton from "../NavButton/NavButton";
import './Nav.css'
import {RootState} from "../../reducers/rootReducer";

const options = [
    {name: 'Strona Główna', url: '/'},
    {name: 'Przystanki', url: '/przystanki'},
    {name: 'Połączenia', url: '/linie'},
    {name: 'Znajdź Trasę', url: '/znajdz-trase'}
]

const Nav = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const dispatch = useDispatch();

    const buttons = options.map((option, id: number) =>
        <NavButton
            id={id}
            key={option.name}
            name={option.name}
            url={option.url}
        />)

    const handleSetShowMobileMenu = () => {
        if(showMobileMenu){
            dispatch(hideAnimation())
            setShowMobileMenu(false)
        }
        else{
            dispatch(showAnimation())
            setShowMobileMenu(true)
        }
    }

    return (
        <>
            <div className="mobile-menu" onClick={handleSetShowMobileMenu}>
                <svg width="40" height="36">
                    <rect y="0" width="40" height="6" fill="#a1a1a1" className={showMobileMenu ? 'upper-bar-active' : 'upper-or-down-bar-inactive'}  />
                    <rect y="15" width="40" height="6" fill="#a1a1a1" className={showMobileMenu ? 'middle-bar-active' : 'middle-bar-inactive'} />
                    <rect y="30" width="40" height="6" fill="#a1a1a1" className={showMobileMenu ? 'down-bar-active' : 'upper-or-down-bar-inactive'} />
                </svg>
            </div>
            <header className={showMobileMenu ? "big-z-index" : "low-z-index"}>
                <nav>
                    <ul className={showMobileMenu ? "main-menu big-z-index" : "main-menu low-z-index"}>
                        {buttons}
                    </ul>
                </nav>
            </header>
        </>

    );
}

export default Nav;