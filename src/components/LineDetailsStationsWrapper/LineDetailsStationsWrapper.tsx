import React from "react";
import Line from "../../data/classes/Line";
import StationComponent from "../StationComponent/StationComponent";
import './LineDetailsStationsWrapper.css'

type propsType = {
    line: Line
}

const LineDetailsStationsWrapper = (props: propsType) => {

    const stationComponents = props.line.stations.map((station, index) => {
        const arrow = index < props.line.stations.length - 1 ? <div className="icon-wrapper"><i className="icon-right-thin"></i></div> : null
        return <StationComponent station={station} />

    })

    return(
        <div className="stations-of-lines">
            {stationComponents}
        </div>
    )
}

export default LineDetailsStationsWrapper;