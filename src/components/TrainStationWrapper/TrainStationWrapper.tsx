import React from "react";
import StationFilters from "../StationFilters/StationFilters";
import './TrainStationWrapper.css'
import StationChoosing from "../StationChoosing/StationChoosing";

const TrainStationWrapper = () => {
    return(
        <div data-testid="train-station-wrapper" className="train-station-wrapper">
            <StationFilters />
            <StationChoosing />
        </div>
    )
}

export default TrainStationWrapper