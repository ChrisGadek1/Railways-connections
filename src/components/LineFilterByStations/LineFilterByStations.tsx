import React from "react";
import './LineFiltersByStations.css'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {addAllLines, addAllStations, removeAllLines, removeALLStations} from "../../actions/selectDataActions";
import {useDispatch, useSelector} from "react-redux";
import Line from "../../data/classes/Line";
import {RootState} from "../../reducers/rootReducer";
import Station from "../../data/classes/Station";

const animatedComponents = makeAnimated();

type Option = {
    label: string,
    value: number
}

const LineFilterByStations = () => {

    const dispatcher = useDispatch()
    const stations: Station[] = useSelector((state: RootState) => state.data.data.stations)

    const handleOnChange = (options: readonly Option[]) => {
        const foundStations = stations.filter(station => {
            return options.find(option => option.value === station.id)
        })
        dispatcher(removeALLStations());
        dispatcher(addAllStations(foundStations));
    }

    const stationOptions = stations.map((station):Option => {
        return{
            label: station.name,
            value: station.id
        }
    })

    return(
        <div className="filter-lines-by-stations">
            <Select
                placeholder="Wybierz stacje, przez które przechodzić ma linia..."
                // @ts-ignore
                onChange={handleOnChange}
                components={animatedComponents}
                isMulti
                options={stationOptions}
            />
        </div>
    )
}

export default LineFilterByStations;