import React from "react";
import './LineDetails.css'
import {useParams} from "react-router-dom";
import Station from "../../data/classes/Station";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import StationMap from "../StationMap/StationMap";
import StationDetailsLinesWrapper from "../StationDetailsLinesWrapper/StationDetailsLinesWrapper";
import Line from "../../data/classes/Line";

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
                <div className="station-details">
                    <div className="station-details-content">
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
                            <div id="station-details-map"></div>

                        </section>
                    </div>
                </div>
            </>
        )
    }

}

export default LineDetails;