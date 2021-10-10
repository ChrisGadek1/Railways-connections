import Station from "../data/classes/Station";
import Line from "../data/classes/Line";

export const LOAD_DATA = 'LOAD_DATA'

type loadDataType = {
    stations: Station[],
    lines: Line[],
    speed: number
}

export const loadData = ({stations, lines, speed}: loadDataType) => ({
    type: LOAD_DATA,
    payload: {
        stations,
        lines,
        speed
    }
})