import React from "react";
import WeekDate from "../../data/classes/WeekDate";
import Station from "../../data/classes/Station";
import StationComponent from "../StationComponent/StationComponent";
import './StationTime.css'

type propsType = {
    station: Station,
    time: WeekDate
}

const StationTime = (props: propsType) => {



    return(
        <div className="station-time">
            <StationComponent station={props.station} />
            <p>{props.time.hoursString()+":"+props.time.minutesString()}</p>
        </div>
    )
}

export default StationTime;