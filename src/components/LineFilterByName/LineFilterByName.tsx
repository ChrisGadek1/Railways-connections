import React from 'react'
import './LineFilterByName.css'
import Station from "../../data/classes/Station";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {addLine, addStation, removeAllLines, removeALLStations} from "../../actions/selectDataActions";
import Line from "../../data/classes/Line";
import Select from "react-select";

type Option = {
    label: string,
    value: string
}

const LineFilterByName = () => {

    const lines: Line[] = useSelector((state: RootState) => state.data.data.lines)
    const dispatcher = useDispatch()

    const linesOptions = lines.map((line: Line): Option => {
        return{
            label: line.name,
            value: line.name
        }
    })

    const handleOnChange = (option: Option | null) => {
        if(option !== null){
            const foundLine = lines.find(line => line.name === option.label);
            if(foundLine === undefined){
                throw 'cannot find station with name:'+option.value
            }
            dispatcher(removeAllLines());
            dispatcher(addLine(foundLine));
        }
    }

    return(
        <div className="filter-lines-by-name">
            <Select options={linesOptions}
                    placeholder="Wybierz nazwę linii..."
                    onChange={handleOnChange}
            />
        </div>
    )
}

export default LineFilterByName;