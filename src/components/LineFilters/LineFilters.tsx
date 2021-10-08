import React from "react";
import LineFilterByName from "../LineFilterByName/LineFilterByName";
import LineFilterByStations from "../LineFilterByStations/LineFilterByStations";
import './LineFilters.css'

const LineFilters = () => {
    return(
        <div className="lines-choosing">
            <LineFilterByName />
            <LineFilterByStations />
        </div>
    )
}

export default LineFilters;