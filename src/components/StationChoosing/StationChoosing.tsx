import React from "react";
import './StationsChoosing.css'
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {StationsFilter} from "../../services/filters/StationsFilter";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import StationComponent from "../StationComponent/StationComponent";

const StationChoosing = () => {

    const stations = useSelector((state: RootState) => state.data.data.stations);
    const selectedStations:Station[] = useSelector((state:any) => state.selectedData.selectedStations)
    const selectedLines: Line[] = useSelector((state: any) => state.selectedData.selectedLines)

    const filteredStations = StationsFilter.filter(stations, selectedStations, selectedLines);

    const stationComponents = filteredStations.map(station => <StationComponent key={station.name} station={station} />)

    return(
        <div className="stations-choosing">
            <section>
                <h2>Znalezione stacje:</h2>
                <div className="stations-container">
                    {stationComponents}
                </div>
            </section>
        </div>
    )
}

export default StationChoosing;