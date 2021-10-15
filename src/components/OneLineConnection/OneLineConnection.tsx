import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import StationComponent from "../StationComponent/StationComponent";

type propsType = {
    color: string,
    path: [
        {
            station: Station,
            line: Line,
            time: number
        }
    ]
}

const OneLineConnection = (props:propsType) => {

    const stations = props.path.map(node => <StationComponent key={node.station.name+node.line.name} station={node.station}/>)

    return(
        <div style={{backgroundColor: props.color}}>
            {stations}
        </div>
    )
}

export default OneLineConnection;