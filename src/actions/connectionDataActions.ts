import Station from "../data/classes/Station";
import WeekDate from "../data/classes/WeekDate";

export const ADD_BEGIN_STATION = 'ADD_BEGIN_STATION'
export const REMOVE_BEGIN_STATION = 'REMOVE_BEGIN_STATION'
export const ADD_END_STATION = 'ADD_END_STATION'
export const REMOVE_END_STATION = 'REMOVE_END_STATION'
export const ADD_DEPARTURE_TIME = 'ADD_DEPARTURE_TIME'
export const REMOVE_DEPARTURE_TIME = 'REMOVE_DEPARTURE_TIME'

export const addBeginStation = (station: Station) => {
    return{
        type: ADD_BEGIN_STATION,
        payload: station
    }
}

export const removeBeginStation = () => {
    return{
        type: REMOVE_BEGIN_STATION,
        payload: {}
    }
}

export const addEndStation = (station: Station) => {
    return{
        type: ADD_END_STATION,
        payload: station
    }
}

export const removeEndStation = () => {
    return{
        type: REMOVE_END_STATION,
        payload: {}
    }
}

export const addDepartureTime = (date: Date) => {
    return{
        type: ADD_DEPARTURE_TIME,
        payload: date
    }
}

export const removeDepartureTime = () => {
    return{
        type: REMOVE_DEPARTURE_TIME,
        payload: {}
    }
}

