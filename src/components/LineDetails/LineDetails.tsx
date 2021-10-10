import React from "react";
import './LineDetails.css'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";
import LineMap from "../LineMap/LineMap";
import LineDetailsStationsWrapper from "../LineDetailsStationsWrapper/LineDetailsStationsWrapper";
import StationDeparturesTimes from "../StationDeparturesTimes/StationDeparturesTimes";

type LineParams = {
    name: string;
};

const LineDidntFound = (props: LineParams) => {
    return(
        <section>
            <h2>
                Błąd 404 <br />
                Nie znaleziono linii o nazwie {props.name}
            </h2>
        </section>
    )
}

const LineDetails = () => {

    let { name } = useParams<LineParams>()
    name = name.toUpperCase()
    const lines: Line[] = useSelector((state: RootState) => state.data.data.lines);
    const line: Line|undefined = lines.find(line => line.name === name)

    if(line === undefined){
        return(
            <>
                <div className="line-details">
                    <div className="line-details-content">
                        <LineDidntFound name={name} />
                    </div>
                </div>
            </>
        )
    }
    else{
        return(
            <>
                <div className="line-details">
                    <div className="line-details-content">
                        <section>
                            <h2>Szczegóły na temat wybranej linii: {line.name}</h2>
                            <LineMap line={line}/>
                        </section>
                        <section className="line-stations-container">
                            <h2>Przystanki (w kolejności przejazdu):</h2>
                            <LineDetailsStationsWrapper line={line}/>
                            <hr />
                            <h2>Godziny odjazdów:</h2>
                            <h3><i className="icon-train"></i>Kierunek: {line.end.name} </h3>
                            <h3>Stacja początkowa: {line.begin.name}</h3>
                            <StationDeparturesTimes station={line.stations[0]} line={line} reversed={false} />
                            <h3><i className="icon-train"></i>Kierunek: {line.begin.name} </h3>
                            <h3>Stacja początkowa: {line.end.name}</h3>
                            <StationDeparturesTimes station={line.stations[0]} line={line} reversed={true} />
                        </section>
                    </div>
                </div>
            </>
        )
    }

}

export default LineDetails;