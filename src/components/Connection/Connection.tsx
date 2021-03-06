import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import './Connection.css'
import LineComponent from "../LineComponent/LineComponent";
import {useHistory} from "react-router-dom";

type propsType = {
    path: [
        {
            station: Station,
            line: Line,
            time: number,
            reverse: boolean
        }
    ]
}

const Connection = (props:propsType) => {

    const weekDateConverter = new WeekDateConverter();
    const beginTime = weekDateConverter.convert(props.path[0].time)
    const arriveTime = weekDateConverter.convert(props.path[props.path.length - 1].time)

    let lines = []
    props.path.forEach((p, index) => {
        if(index > 0 && p.line.name !== props.path[index - 1].line.name){
            lines.push(<LineComponent key={props.path[index - 1].line.name+"connection"+Math.random().toString()} line={props.path[index - 1].line}/>)
        }
    })
    lines.push(<LineComponent line={props.path[props.path.length - 1].line}/>)

    const history = useHistory()

    const handleClickOnConnection = () => {
        let connectionURL = "/connection/"
        props.path.forEach((p,i) => {
            connectionURL += `${p.line.name}-${p.station.id}-${p.time}-${p.reverse}`
            if(i !== props.path.length - 1){
                connectionURL += '-'
            }
        })
        history.push(connectionURL);
    }

    return(
        <div className="connection" onClick={handleClickOnConnection}>
            <div className="departure-time-div">{beginTime.hoursString()+":"+beginTime.minutesString()}</div>
            <i className="icon-right-thin"></i>
            <div className="arrive-time-div">{arriveTime.hoursString()+":"+arriveTime.minutesString()}</div>
            <div>
                {lines}
            </div>

        </div>
    )
}

export default Connection;