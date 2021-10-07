import React from "react";
import StationFilters from "../StationFilters/StationFilters";
import './TrainStationWrapper.css'

const TrainStationWrapper = () => {
    return(
        <div data-testid="train-station-wrapper" className="train-station-wrapper">
            <StationFilters />
        </div>
    )
}

export default TrainStationWrapper