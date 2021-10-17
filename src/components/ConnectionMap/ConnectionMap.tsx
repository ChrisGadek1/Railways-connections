import React, {useEffect} from "react";
import './ConnectionMap.css'
import ConnectionMapProvider from "../../services/mapProviders/ConnectionMapProvider";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";

type path = {
    path: [
        {
            station: Station,
            line: Line,
            time: number
        }
    ]
}

const ConnectionMap = (props:path) => {

    const colors = ['blue','yellow','green','red']

    useEffect(() =>{
        const connectionMap = ConnectionMapProvider.getInstance()
        connectionMap.addMap()
        if(props.path !== undefined){
            //@ts-ignore
            connectionMap.addConnections(props, colors);
        }
        return () => {
            connectionMap.removeMap()
        }
    })

    return(
        <div id="mapdiv-connection">

        </div>
    )
}

export default ConnectionMap;