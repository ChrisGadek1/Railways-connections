import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import OneLineConnection from "../OneLineConnection/OneLineConnection";

type propsType = {
    path: [
        {
            station: Station,
            line: Line,
            time: number,
            reverse: boolean
        }
    ],
    colors: string[]
}

const OneConnectionDetails = (props: propsType) => {
    const lines = []
    const colors = props.colors
    let currentLines = []
    let colorIndex = 0;
    for(let i = 0; i < props.path.length; i++){
        currentLines.push(props.path[i])
        if( i === props.path.length - 1 || props.path[i].line.name !== props.path[i + 1].line.name){
            //@ts-ignore
            lines.push(<OneLineConnection reverse={props.path[i].reverse} line={props.path[i].line} key={props.path[i].line+Math.random()} color={colors[colorIndex++]} path={currentLines}/>)
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