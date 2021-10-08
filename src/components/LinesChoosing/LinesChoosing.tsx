import React from "react";
import './LinesChoosing.css'
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import {LinesFilter} from "../../services/filters/LinesFilter/LinesFilter";
import LineComponent from "../LineComponent/LineComponent";

const LinesChoosing = () => {

    const lines: Line[] = useSelector((state: RootState) => state.data.data.lines);
    const selectedStations:Station[] = useSelector((state:any) => state.selectedData.selectedStations)
    const selectedLines: Line[] = useSelector((state: any) => state.selectedData.selectedLines)

    const filteredLines = LinesFilter.filter(lines, selectedStations, selectedLines);
    filteredLines.sort((a, b) => (a.name > b.name) ? 1 : -1)

    const lineComponents = filteredLines.map(line => <LineComponent key={line.name} line={line} />)

    return(
        <div className="lines-wrapper">
            <section>
                <h2>Znalezione linie:</h2>
                <div className="lines-inner-container">
                    {lineComponents}
                </div>
            </section>
        </div>
    )
}

export default LinesChoosing;