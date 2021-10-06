import Station from "../data/classes/Station";
import Line from "../data/classes/Line";

export const LOAD_DATA = 'LOAD_DATA'

type loadDataType = {
    stations: Station[],
    lines: Line[]
}

export const loadData = ({stations, lines}: loadDataType) => ({
    type: LOAD_DATA,
    payload: {
        stations,
        lines
    }
})