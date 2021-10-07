import React from "react";
import FilterStationsByName from "../FilterStationsByName/FilterStationsByName";
import FilterStationsByLines from "../FilterStationByLines/FilterStationsByLines";

const StationFilters = () => {
    return(
        <div>
            <FilterStationsByName />
            <FilterStationsByLines />
        </div>
    )
}

export default StationFilters;