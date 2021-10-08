import React, {useEffect} from "react";
import StationFilters from "../StationFilters/StationFilters";
import './TrainStationWrapper.css'
import StationChoosing from "../StationChoosing/StationChoosing";
import {removeAllLines, removeALLStations} from "../../actions/selectDataActions";
import {useDispatch} from "react-redux";

const TrainStationWrapper = () => {

    const dispatcher = useDispatch();

    useEffect(() => {
        return () => {
            dispatcher(removeAllLines())
            dispatcher(removeALLStations())
        }
    })

    return(
        <div data-testid="train-station-wrapper" className="train-station-wrapper">
            <StationFilters />
            <StationChoosing />
        </div>
    )
}

export default TrainStationWrapper