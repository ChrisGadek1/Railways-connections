import React, {useEffect} from "react";
import './TrainChoosingWrapper.css'
import LineFilters from "../LineFilters/LineFilters";
import {useDispatch} from "react-redux";
import {removeAllLines, removeALLStations} from "../../actions/selectDataActions";
import LinesChoosing from "../LinesChoosing/LinesChoosing";

const TrainChoosingWrapper = () => {

    const dispatcher = useDispatch();

    useEffect(() => {
        return () => {
            dispatcher(removeAllLines())
            dispatcher(removeALLStations())
        }
    })

    return(
        <div data-testid="train-choosing-wrapper" className="train-choosing-wrapper">
            <LineFilters />
            <LinesChoosing />
        </div>
    )
}

export default TrainChoosingWrapper;