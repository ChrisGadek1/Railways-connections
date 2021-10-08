import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import './StationDetails.css'
import MainPage from "../MainPage/MainPage";
import Station from "../../data/classes/Station";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import StationDetailsMapProvider from "../../services/mapProviders/StationDetailsMapProvider";

type StationParams = {
    id: string;
};

type StationDidntFoundProps = {
    id: string
}

const StationDidntFound = (props: StationDidntFoundProps) => {
    return(
        <section>
            <h2>
                Błąd 404 <br />
                Nie znaleziono stacji o id równym {props.id}
            </h2>
        </section>
    )
}

const StationDetails = () => {

    const { id } = useParams<StationParams>()
    const stations: Station[] = useSelector((state: RootState) => state.data.data.stations);
    const station: Station|undefined = stations.find(station => station.id === parseInt(id, 10))

    useEffect(() => {
        if(station !== undefined){
            const mapProvider = StationDetailsMapProvider.getInstance(station)
            mapProvider.addMap()
            mapProvider.addStationToTheMap()
            return () => {
                mapProvider.removeMap()
            }
        }

    },[stations])

    if(station === undefined){
        return(
            <>
                <div className="station-details">
                    <div className="station-details-content">
                        <StationDidntFound id={id}/>
                    </div>
                </div>
            </>
        )
    }
    else{
        return(
            <>
                <div className="station-details">
                    <div className="station-details-content">
                        <section>
                            <h2>Szczegóły na temat wybranej stacji: {station.name}</h2>
                            <div id="station-details-map">

                            </div>
                        </section>
                    </div>
                </div>
            </>
        )
    }



}

export default StationDetails;