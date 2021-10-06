import React, {useEffect} from "react";
import MainPageMapProvider from "../../services/mapProviders/mainPageMapProvider";
import './MainPageMap.css'
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";

const MainPageMap = () => {
    let map:any;
    const data = useSelector((state: RootState) => state.data)

    useEffect(() => {
        map = MainPageMapProvider.getInstance()
        map.addMap();
        map.addPointsToTheMap(data.stations)
        return () => {
            map.removeMap()
        }
    }, [data])


    return(
        <div id="mapid">

        </div>
    )
}

export default MainPageMap;