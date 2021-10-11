import React from "react";
import ChooseStationsForConnection from "../ChooseStationsForConnection/ChooseStationsForConnection";
import {
    addBeginStation,
    addEndStation,
    removeBeginStation,
    removeEndStation
} from "../../actions/connectionDataActions";
import './ConnectionsDataChoosing.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";

const ConnectionsDataChoosing = () => {

    const dispatcher = useDispatch();
    const beginStation: Station = useSelector((state:RootState) => state.connection.beginStation)
    const endStation: Station = useSelector((state:RootState) => state.connection.endStation)

    const handleExchangeClick = () => {
        dispatcher(removeBeginStation());
        dispatcher(removeEndStation());
        dispatcher(addBeginStation(endStation));
        dispatcher(addEndStation(beginStation));
    }

    return(
        <div className="connections-data-choosing">
            <ChooseStationsForConnection
                removeAction={removeBeginStation}
                addAction={addBeginStation}
                placeholder={"Wybierz stację początkową..."}
                propName={"beginStation"}
            />
            <div className="exchange-div" onClick={handleExchangeClick}>
                <i className="icon-exchange"></i>
            </div>
            <ChooseStationsForConnection
                removeAction={removeEndStation}
                addAction={addEndStation}
                placeholder={"Wybierz stację końcową..."}
                propName={"endStation"}
            />
        </div>
    )
}

export default ConnectionsDataChoosing;