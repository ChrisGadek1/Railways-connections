import React from "react";
import Line from "../../data/classes/Line";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";
import StationDetailsLine from "../StationDetailsLine/StationDetailsLine";

type propTypes = {
    station: Station
}

const StationDetailsLinesWrapper = (props:propTypes) => {


    const lines:Line[] = useSelector((state:RootState) => state.data.data.lines);
    if(props.station !== undefined){
        const linesContainingStation = lines.filter(line => line.stations.find(station => station.id === props.station.id) !== undefined)
        const stationDetailsLines = linesContainingStation.map(line => <StationDetailsLine key={line.name+" "+props.station.id}
                                                                                           line={line}
                                                                                           station={props.station}/>)

        return(
            <div>
                {stationDetailsLines}
            </div>
        )
    }
    else{
        return (
            <div></div>
        )
    }

}

export default StationDetailsLinesWrapper;