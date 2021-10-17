import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import './OneLineConnection.css'
import StationTime from "../StationTime/StationTime";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import LineComponent from "../LineComponent/LineComponent";

type propsType = {
    color: string,
    line: Line,
    path: [
        {
            station: Station,
            time: number
        }
    ]
}

const OneLineConnection = (props:propsType) => {

    const weekDateConverter = new WeekDateConverter();
    const stations = props.path.map(node => <StationTime time={weekDateConverter.convert(node.time)} key={node.station.name+"station-time"+Math.random()} station={node.station}/>)

    return(
        <div className="one-line-connection" style={{backgroundColor: props.color}}>
            <div>
                <LineComponent line={props.line}/>
            </div>
            <div className="one-line-connection-inner">

                {stations}
            </div>
        </div>

    )
}

export default OneLineConnection;