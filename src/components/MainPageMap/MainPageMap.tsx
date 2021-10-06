import React, {useEffect} from "react";
import MainPageMapProvider from "../../services/mapProviders/mainPageMapProvider";
import './MainPageMap.css'
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";

const linesColors = [
    "red",
    "blue",
    "green",
    "orange",
    "black"
]

const MainPageMap = () => {
    let map:any;
    const data = useSelector((state: RootState) => state.data.data)

    useEffect(() => {
        map = MainPageMapProvider.getInstance()
        map.addMap();
        if(data.stations.length > 0){
            map.addPointsToTheMap(data.stations)
        }
        if(data.lines.length > 0){
            data.lines.forEach((line: Line, index :number) => {
                map.drawLineOfStations(line, linesColors[index]);
            })
            map.createLegend(data.lines, linesColors)
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