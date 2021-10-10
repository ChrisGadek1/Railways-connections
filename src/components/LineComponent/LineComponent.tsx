import React from "react";
import './LineComponent.css'
import Line from "../../data/classes/Line";
import {useHistory} from "react-router-dom";

type propsType = {
    line: Line
}

const LineComponent = (props:propsType) => {

    const history = useHistory()

    const handleClick = () => {
        history.push('/linie/'+props.line.name)
    }

    return(
        <div className="line-component" onClick={handleClick}>
            <i className="icon-train"></i>
            <span>{props.line.name}</span>
        </div>
    )
}

export default LineComponent;