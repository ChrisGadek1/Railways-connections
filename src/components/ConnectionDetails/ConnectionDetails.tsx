import React from "react";
import './ConnectionDetails.css'
import {useParams} from "react-router-dom";
import Station from "../../data/classes/Station";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";
import OneConnectionDetails from "../OneConnectionDetails/OneConnectionDetails";
import ConnectionMap from "../ConnectionMap/ConnectionMap";

type propsType = {
    path: [
        {
            station: Station,
            line: Line,
            time: number,
            reverse: boolean
        }
    ]
}

const ConnectionDetails = () => {
    let colors = ['#c8c7f0','#ebeba7','#ccf0c7','#f2a083']
    const { stations } : any = useParams();
    const stationsFromState: Station[] = useSelector((state: RootState) => state.data.data.stations);
    const linesFromState: Line[] = useSelector((state: RootState) => state.data.data.lines);
    const stringDataFromParams = stations.split("-");
    const path = []
    for(let i = 0; i < stringDataFromParams.length - 3; i+=4){
        const lineName = stringDataFromParams[i]
        const stationID = stringDataFromParams[i + 1]
        const time = parseInt(stringDataFromParams[i + 2])
        const reverse = stringDataFromParams[i + 3] === "false" ? false : true
        path.push({
            station: stationsFromState.find(station => station.id.toString() === stationID),
            line: linesFromState.find(line => line.name === lineName),
            time: time,
            reverse
        })
    }

    return(
        <div className="connection-details">
            {/*@ts-ignore*/}
            <ConnectionMap path={path} />
            {/*@ts-ignore*/}
            <OneConnectionDetails path={path} colors={colors}/>
        </div>
    )
}

export default ConnectionDetails;