import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import StationComponent from "../StationComponent/StationComponent";
import OneLineConnection from "../OneLineConnection/OneLineConnection";

type propsType = {
    path: [
        {
            station: Station,
            line: Line,
            time: number
        }
    ]
}

const OneConnectionDetails = (props: propsType) => {

    const lines = []
    const currentLines = []
    for(let i = 0; i < props.path.length; i++){
        if(i > 0 && props.path[i].line.name !== props.path[i - 1].line.name){
            //@ts-ignore
            lines.push(<OneLineConnection key={props.path[i].line+props.path[i].time} color={"red"} path={currentLines}/>)
        }
        currentLines.push(props.path[i])
    }

    return(
        <div>
            {lines}
        </div>
    )
}

export default OneConnectionDetails;