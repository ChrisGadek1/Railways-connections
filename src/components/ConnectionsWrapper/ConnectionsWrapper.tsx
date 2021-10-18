import React from "react";
import Station from "../../data/classes/Station";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import Graph from "../../data/classes/Graph";
import Connection from "../Connection/Connection";

const ConnectionsWrapper = () => {

    const beginStation: Station = useSelector((state: RootState) => state.connection.beginStation);
    const endStation: Station = useSelector((state: RootState) => state.connection.endStation);
    const departureTime: Date = useSelector((state: RootState) => state.connection.departureTime);
    const lines: Line[] = useSelector((state: RootState) => state.data.data.lines);
    const speed: number = useSelector((state: RootState) => state.data.data.speed);

    const weekDateConverter = new WeekDateConverter()
    const paths = []

    if(departureTime !== null && beginStation !== null && endStation !== null){
        let currentTime = weekDateConverter.convertFromDate(departureTime);
        for(let i = 0; i < 3; i++){
            const graph: Graph = new Graph(lines, currentTime , speed)
            graph.setDestinationAndBeginning(beginStation, endStation)
            graph.computeBestTime()
            const result = graph.getFastestPath().reverse();
            const path = {
                path: result.map(node => ({
                    station: node.station,
                    line: node.line,
                    time: node.getTime(),
                    reverse: node.reversed
                }))
            }
            //@ts-ignore
            paths.push(<Connection key={i+"path"} path={path.path}/>)
            currentTime = weekDateConverter.convert(path.path[0].time)
        }
    }



    return(
        <div>
            {paths}
        </div>
    )
}

export default ConnectionsWrapper;