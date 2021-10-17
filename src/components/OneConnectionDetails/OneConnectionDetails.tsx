import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
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
    let currentLines = []
    let colors = ['#c8c7f0','#ebeba7','#ccf0c7','#f2a083']
    for(let i = 0; i < props.path.length; i++){
        currentLines.push(props.path[i])
        if( i === props.path.length - 1 || props.path[i].line.name !== props.path[i + 1].line.name){
            //@ts-ignore
            lines.push(<OneLineConnection line={props.path[i].line} key={props.path[i].line+Math.random()} color={colors.pop()} path={currentLines}/>)
            currentLines = []
        }
    }

    return(
        <div>
            {lines}
        </div>
    )
}

export default OneConnectionDetails;