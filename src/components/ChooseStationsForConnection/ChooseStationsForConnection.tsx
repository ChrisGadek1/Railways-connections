import React from 'react'
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";
import './ChooseStationsForConnection.css'

type propsType = {
    removeAction: any
    addAction: any,
    placeholder: string
}

type Option = {
    label: string,
    value: string
}


const ChooseStationsForConnection = (props: propsType) => {

    const dispatcher = useDispatch()
    const stations: Station[] = useSelector((state:RootState) => state.data.data.stations);
    const stationsOptions = stations.map((station: Station): Option => ({
        value: station.id.toString(),
        label: station.name
    }))

    const handleChange = (option: Option | null) => {
        if(option !== null){
            const station: Station|undefined = stations.find(station => station.id.toString() === option.value)
            if(station === undefined){
                throw 'Cannot find station with id: '+option.value+" and name: "+option.label
            }
            dispatcher(props.removeAction());
            dispatcher(props.addAction(station))
        }
    }

    return(
        <div className="station-for-connection-choosing">
            <Select
                options={stationsOptions}
                placeholder={props.placeholder}
                onChange={handleChange}
            />
        </div>

    )
}

export default ChooseStationsForConnection;