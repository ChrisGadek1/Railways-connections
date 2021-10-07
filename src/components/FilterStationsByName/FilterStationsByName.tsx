import React from "react";
import Select, {ActionMeta} from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";
import {addStation, removeALLStations} from "../../actions/selectDataActions";

type Option = {
    label: string,
    value: string
}

const FilterStationsByName = () => {

    const stations: Station[] = useSelector((state: RootState) => state.data.data.stations)
    const dispatcher = useDispatch()

    const stationOptions = stations.map((station: Station): Option => {
        return{
            label: station.name,
            value: station.id.toString()
        }
    })

    const handleOnChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {
        if(option !== null){
            const foundStation = stations.find(station => station.name === option.label);
            if(foundStation === undefined){
                throw 'cannot find station with name:'+option.value
            }
            dispatcher(removeALLStations());
            dispatcher(addStation(foundStation));
        }
    }

    return(
        <div className="filter-stations-by-name">
            <Select options={stationOptions}
                    placeholder="Wybierz nazwę stacji..."
                    onChange={handleOnChange}
            />
        </div>
    )
}

export default FilterStationsByName;