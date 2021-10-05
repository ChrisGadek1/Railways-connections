import React, {useEffect} from "react";
import MainPageMapProvider from "../../services/mapProviders/mainPageMapProvider";
import './MainPageMap.css'

const MainPageMap = () => {

    let map;

    useEffect(() => {
        map = new MainPageMapProvider();
    }, [])

    return(
        <div id="mapid">

        </div>
    )
}

export default MainPageMap;