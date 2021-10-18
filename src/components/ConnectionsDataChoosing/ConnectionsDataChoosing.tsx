import React, {useEffect} from "react";
import ChooseStationsForConnection from "../ChooseStationsForConnection/ChooseStationsForConnection";
import {
    addBeginStation, addDepartureTime,
    addEndStation,
    removeBeginStation, removeDepartureTime,
    removeEndStation
} from "../../actions/connectionDataActions";
import './ConnectionsDataChoosing.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pl} from 'date-fns/locale'
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";



const ConnectionsDataChoosing = () => {

    const dispatcher = useDispatch();
    const beginStation: Station = useSelector((state:RootState) => state.connection.beginStation)
    const endStation: Station = useSelector((state:RootState) => state.connection.endStation)
    const departureTime: Date = useSelector((state: RootState) => state.connection.departureTime);

    useEffect(() => {
        if(departureTime === null){
            dispatcher(addDepartureTime(new Date()));
        }
        return () => {
            dispatcher(removeBeginStation())
            dispatcher(removeDepartureTime());
            dispatcher(removeEndStation());
        }
    }, [])

    const handleExchangeClick = () => {
        dispatcher(removeBeginStation());
        dispatcher(removeEndStation());
        dispatcher(addBeginStation(endStation));
        dispatcher(addEndStation(beginStation));
    }

    const handleDateChange = (dateFromPicker: MaterialUiPickersDate) => {
        if(dateFromPicker !== null){
            dispatcher(removeDepartureTime())
            dispatcher(addDepartureTime(dateFromPicker));
        }

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
            <div className="departure-time-pickers">
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
                        <DatePicker value={departureTime}
                                    label="Wybierz dzień"
                                    onChange={handleDateChange}/>
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
                        <TimePicker value={departureTime}
                                    label="Wybierz godzinę"
                                    ampm={false}
                                    onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>



        </div>
    )
}

export default ConnectionsDataChoosing;