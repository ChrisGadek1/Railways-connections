import React, {useEffect, useState} from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import LineComponent from "../LineComponent/LineComponent";
import './StationDetailsLine.css'
import StationDeparturesTimes from "../StationDeparturesTimes/StationDeparturesTimes";
import $ from 'jquery'

type propsType = {
    station: Station,
    line: Line
}

type propsStationList = {
    station: Station;
    line: Line;
    reversed: boolean;
}

const StationList = (props: propsStationList) => {

    let stations: Station[] = props.line.stations;
    if(props.reversed){
        stations = stations.slice().reverse();
    }
    const stationsHTML = stations.map((station, index) => {
        const arrow = index !== props.line.stations.length - 1 ? <i className="icon-right-thin"></i> : null
        if(station.id === props.station.id){
            return <span key={station.name+props.reversed+"stlist"}>
                <strong className="span-station-name current-station">
                    {station.name}
                </strong>
                {arrow}
            </span>
        }
        else {
            return <span key={station.name+props.reversed+"stlist"}>
                <span className="span-station-name">
                    {station.name}
                </span>
                {arrow}
            </span>
        }
    })

    return(
        <div>
            {stationsHTML}
        </div>
    )
}

const StationDetailsLine = (props:propsType) => {

    const [showForward, setShowForward] = useState(false);
    const [showReverse, setShowReverse] = useState(false);

    const handleForwardClick = () => setShowForward(state => !state);
    const handleReversedClick = () => setShowReverse(state => !state);

    return(
        <div className="stations-details-line">
            <div className="line-wrapper">
                <LineComponent line={props.line} />
                <div>
                    <div>
                        <div className="show-hours-icon" onClick={handleForwardClick}>
                            Kierunek: <strong>{props.line.end.name}</strong>
                            <div className={showForward ? "show-content icons-hours-wrapper" : "hide-content icons-hours-wrapper"}>
                                <i className="icon-down-open" ></i>
                            </div>
                        </div>
                        <div className="hours-container" style={showForward ? {height: "auto"} : {height: "0px"}}>
                            <StationList station={props.station} line={props.line} reversed={false} />
                            <StationDeparturesTimes station={props.station} line={props.line} reversed={false} />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="show-hours-icon" onClick={handleReversedClick}>
                            Kierunek: <strong>{props.line.begin.name}</strong>
                            <div className={showReverse ? "show-content icons-hours-wrapper" : "hide-content icons-hours-wrapper"}>
                                <i className="icon-down-open" ></i>
                            </div>
                        </div>
                        <div className="hours-container" style={showReverse ? {height: "auto"} : {height: "0px"}}>
                            <StationList station={props.station} line={props.line} reversed={true} />
                            <StationDeparturesTimes station={props.station} line={props.line} reversed={true} />
                        </div>
                    </div>
                </div>


            </div>
            <hr />
        </div>
    )
}

export default StationDetailsLine;