import React, {useEffect} from "react";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";
import {addAllLines, removeAllLines, removeALLStations} from "../../actions/selectDataActions";
import './FilterStationsByLines.css'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

type Option = {
    label: string,
    value: string
}


const FilterStationsByLines = () => {

    const lines: Line[] = useSelector((state: RootState) => state.data.data.lines)
    const dispatcher = useDispatch()

    let lineOptions = lines.map((line) => {
        return {
            label: `${line.name}: ${line.begin.name} - ${line.end.name}`,
            value: line.name
        }
    })


    const handleOnChange = (options: readonly Option[]) => {
        const foundLines = lines.filter(line => {
            return options.find(option => option.value === line.name)
        })
        dispatcher(removeAllLines());
        dispatcher(addAllLines(foundLines));
    }

    useEffect(() => {
        return () => {
            dispatcher(removeAllLines())
            dispatcher(removeALLStations())
        }
    })


    return(
        <div className="filter-stations-by-line">
            <Select
                    placeholder="Wybierz linie, na których jest przystanek..."
                    // @ts-ignore
                    onChange={handleOnChange}
                    components={animatedComponents}
                    isMulti
                    options={lineOptions}
            />

        </div>
    )
}

export default FilterStationsByLines