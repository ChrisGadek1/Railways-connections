import React, {useState} from "react";
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
import {DatePicker, MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {pl} from 'date-fns/locale'
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";



const ConnectionsDataChoosing = () => {

    const [date, setDate] = useState(new Date())

    const dispatcher = useDispatch();
    const beginStation: Station = useSelector((state:RootState) => state.connection.beginStation)
    const endStation: Station = useSelector((state:RootState) => state.connection.endStation)

    const handleExchangeClick = () => {
        dispatcher(removeBeginStation());
        dispatcher(removeEndStation());
        dispatcher(addBeginStation(endStation));
        dispatcher(addEndStation(beginStation));
    }

    const handleDateChange = (dateFromPicker: MaterialUiPickersDate) => {
        if(dateFromPicker !== null){
            setDate(dateFromPicker)
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
                        <DatePicker value={date}
                                    label="Wybierz dzień"
                                    onChange={handleDateChange}/>
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
                        <TimePicker value={date}
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