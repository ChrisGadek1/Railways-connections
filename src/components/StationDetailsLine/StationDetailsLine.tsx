import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import LineComponent from "../LineComponent/LineComponent";
import './StationDetailsLine.css'

type propsType = {
    station: Station,
    line: Line
}

const StationDetailsLine = (props:propsType) => {
    return(
        <div className="stations-details-line">
            <div className="line-wrapper">
                <LineComponent line={props.line} />
                <p>Kierunek: <strong>{props.line.end.name}</strong></p>
            </div>
            <hr />
        </div>
    )
}

export default StationDetailsLine;