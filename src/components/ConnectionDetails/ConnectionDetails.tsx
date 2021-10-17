import React from "react";
import './ConnectionDetails.css'
import {useParams} from "react-router-dom";
import Station from "../../data/classes/Station";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";
import OneConnectionDetails from "../OneConnectionDetails/OneConnectionDetails";

type propsType = {
    path: [
        {
            station: Station,
            line: Line,
            time: number
        }
    ]
}

const ConnectionDetails = () => {

    const { stations } : any = useParams();
    const stationsFromState: Station[] = useSelector((state: RootState) => state.data.data.stations);
    const linesFromState: Line[] = useSelector((state: RootState) => state.data.data.lines);
    const stringDataFromParams = stations.split("-");
    console.log(stringDataFromParams)
    const path = []
    for(let i = 0; i < stringDataFromParams.length - 2; i+=3){
        const lineName = stringDataFromParams[i]
        const stationID = stringDataFromParams[i + 1]
        const time = parseInt(stringDataFromParams[i + 2])
        path.push({
            station: stationsFromState.find(station => station.id.toString() === stationID),
            line: linesFromState.find(line => line.name === lineName),
            time: time
        })
    }
    console.log(path)

    const propsFromParams: propsType = ({
        //@ts-ignore
        path: path
    })

    return(
        <div className="connection-details">
            {/*@ts-ignore*/}
            <OneConnectionDetails path={path}/>
        </div>
    )
}

export default ConnectionDetails;