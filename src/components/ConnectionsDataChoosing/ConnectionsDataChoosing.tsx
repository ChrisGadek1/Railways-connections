import React from "react";
import ChooseStationsForConnection from "../ChooseStationsForConnection/ChooseStationsForConnection";
import {
    addBeginStation,
    addEndStation,
    removeBeginStation,
    removeEndStation
} from "../../actions/connectionDataActions";
import './ConnectionsDataChoosing.css'

const ConnectionsDataChoosing = () => {
    return(
        <div className="connections-data-choosing">
            <ChooseStationsForConnection
                removeAction={removeBeginStation}
                addAction={addBeginStation}
                placeholder={"Wybierz stację początkową..."}
            />
            <ChooseStationsForConnection
                removeAction={removeEndStation}
                addAction={addEndStation}
                placeholder={"Wybierz stację końcową..."}
            />
        </div>
    )
}

export default ConnectionsDataChoosing;