import React from "react";
import Station from "../../data/classes/Station";
import './StationComponent.css'
import {Link, useHistory} from "react-router-dom";

type propsType = {
    station: Station
}

const StationComponent = (props: propsType) => {

    const history = useHistory();

    const handleClick = () => {
        history.push('/przystanki/'+props.station.id)
    }

    return(
        <div className="station-component" onClick={handleClick}>
            <i className="icon-home"></i>
            <span>{props.station.name}</span>
        </div>
    )
}

export default StationComponent;