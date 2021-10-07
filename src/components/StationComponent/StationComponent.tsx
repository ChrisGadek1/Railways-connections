import React from "react";
import Station from "../../data/classes/Station";

type propsType = {
    station: Station
}

const StationComponent = (props: propsType) => {
    return(
        <div className="station-component">
            <span>{props.station.name}</span>
        </div>
    )
}

export default StationComponent;