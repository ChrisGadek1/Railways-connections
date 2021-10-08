import React from "react";
import Station from "../../data/classes/Station";
import './StationComponent.css'

type propsType = {
    station: Station
}

const StationComponent = (props: propsType) => {
    return(
        <div className="station-component">
            <i className="icon-home"></i>
            <span>{props.station.name}</span>
        </div>
    )
}

export default StationComponent;