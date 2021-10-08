import React from "react";
import './LineComponent.css'
import Line from "../../data/classes/Line";

type propsType = {
    line: Line
}

const LineComponent = (props:propsType) => {
    return(
        <div className="line-component">
            <i className="icon-train"></i>
            <span>{props.line.name}</span>
        </div>
    )
}

export default LineComponent;