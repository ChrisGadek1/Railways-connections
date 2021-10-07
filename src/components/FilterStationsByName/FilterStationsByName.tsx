import React from "react";
import Select, {ActionMeta} from "react-select";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";

type Option = {
    label: string,
    value: string
}

const FilterStationsByName = () => {

    const stations = useSelector((state: RootState) => state.data.data.stations)

    const stationOptions = stations.map((station: Station): Option => {
        return{
            label: station.name,
            value: station.id.toString()
        }
    })

    const handleOnChange = (option: Option | null, actionMeta: ActionMeta<Option>) => {

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