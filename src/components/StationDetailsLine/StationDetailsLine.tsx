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
        <div>
            <div className="line-wrapper">
                <LineComponent line={props.line} />
            </div>

        </div>
    )
}

export default StationDetailsLine;