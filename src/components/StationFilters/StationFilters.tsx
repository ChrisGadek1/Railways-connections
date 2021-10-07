import React from "react";
import FilterStationsByName from "../FilterStationsByName/FilterStationsByName";
import FilterStationsByLines from "../FilterStationByLines/FilterStationsByLines";
import './StationFilters.css'

const StationFilters = () => {
    return(
        <div className="station-filters">
            <FilterStationsByName />
            <FilterStationsByLines />
        </div>
    )
}

export default StationFilters;