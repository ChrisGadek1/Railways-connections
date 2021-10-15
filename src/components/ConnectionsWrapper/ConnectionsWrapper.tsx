import React, {} from "react";
import Station from "../../data/classes/Station";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import Graph from "../../data/classes/Graph";
import OneConnectionDetails from "../OneConnectionDetails/OneConnectionDetails";


const ConnectionsWrapper = () => {

    const beginStation: Station = useSelector((state: RootState) => state.connection.beginStation);
    const endStation: Station = useSelector((state: RootState) => state.connection.endStation);
    const departureTime: Date = useSelector((state: RootState) => state.connection.departureTime);
    const lines: Line[] = useSelector((state: RootState) => state.data.data.lines);
    const speed: number = useSelector((state: RootState) => state.data.data.speed);

    let currentTime = departureTime;
    const paths = []
    console.log(beginStation)
    console.log(endStation)
    console.log(departureTime)
    if(departureTime !== null && beginStation !== null && endStation !== null){
        for(let i = 0; i < 3; i++){
            const weekDateConverter = new WeekDateConverter()
            const graph: Graph = new Graph(lines, weekDateConverter.convertFromDate(currentTime), speed)
            graph.setDestinationAndBeginning(beginStation, endStation)
            graph.computeBestTime()
            const result = graph.getFastestPath().reverse();
            const path = {
                path: result.map(node => ({
                    station: node.station,
                    line: node.line,
                    time: node.getTime()
                }))
            }
            //@ts-ignore
            paths.push(<OneConnectionDetails key={i+path.path[i].station.name} path={path.path}/>)
        }
    }



    return(
        <div>
            {paths}
        </div>
    )
}

export default ConnectionsWrapper;