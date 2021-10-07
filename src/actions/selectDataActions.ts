import Station from "../data/classes/Station";
import Line from "../data/classes/Line";

export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_LINE = 'ADD_LINE'
export const REMOVE_LINE = 'REMOVE_LINE'

export const addStation = (station: Station) => ({
    type: ADD_STATION,
    payload: station
})

export const removeStation = (id: number) => ({
    type: REMOVE_STATION,
    payload: id
})

export const addLine = (line: Line) => ({
    type: ADD_LINE,
    payload: line
})

export const removeLine = (name: string) => ({
    type: REMOVE_LINE,
    payload: name
})