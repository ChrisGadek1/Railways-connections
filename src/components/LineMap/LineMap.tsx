import React, {useEffect} from "react";
import Line from "../../data/classes/Line";
import LineDetailsMapProvider from "../../services/mapProviders/LineDetailsMapProvider";

type LineMapProps = {
    line: Line
}

const LineMap = (props: LineMapProps) => {

    useEffect(() => {
        if(props.line !== undefined){
            const mapProvider = LineDetailsMapProvider.getInstance(props.line)
            mapProvider.addMap()
            mapProvider.drawLine()
            mapProvider.addPointsToTheMap()
            return () => {
                mapProvider.removeMap()
            }
        }

    },[])

    return(
        <div id="line-details-map">

        </div>
    )
}

export default LineMap;