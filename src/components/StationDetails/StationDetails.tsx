import React from "react";
import {useParams} from "react-router-dom";
import './StationDetails.css'
import Station from "../../data/classes/Station";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import StationMap from "../StationMap/StationMap";
import StationDetailsLinesWrapper from "../StationDetailsLinesWrapper/StationDetailsLinesWrapper";

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

                            <StationMap station={station} />
                            <div className="station-lines-container">
                                <h2>Odjazdy pociągów</h2>
                                <StationDetailsLinesWrapper station={station} />
                            </div>
                        </section>
                    </div>
                </div>
            </>
        )
    }



}

export default StationDetails;