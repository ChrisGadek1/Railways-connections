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
        if(data.data.stations.length > 0){
            map.addPointsToTheMap(data.data.stations)
        }
        if(data.data.lines.length > 0){
            map.drawLineOfStations(data.data.lines[0]);
        }
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