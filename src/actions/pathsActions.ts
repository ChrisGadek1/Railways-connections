import WeekDate from "../data/classes/WeekDate";

export const ADD_PATH = 'ADD_PATH'
export const REMOVE_ALL_PATHS = 'REMOVE_ALL_PATHS'
export const INCREASE_MAX_PATHS = 'INCREASE_MAX_PATHS'
export const RESET_MAX_PATHS = 'RESET_MAX_PATHS'
export const ADD_NEXT_CONNECTION_TIME = 'ADD_NEXT_CONNECTION_TIME'
export const RESET_NEXT_CONNECTION_TIME = 'RESET_NEXT_CONNECTION_TIME'

export const addPath = (path: any) => {
    return{
        type: ADD_PATH,
        payload: path
    }
}

export const removeALLPaths = () => {
    return{
        type: REMOVE_ALL_PATHS,
        payload: {}
    }
}

export const increaseMaxPaths = (newNumber: number) => {
    return{
        type: INCREASE_MAX_PATHS,
        payload: newNumber
    }
}

export const resetMaxPaths = () => {
    return{
        type: RESET_MAX_PATHS,
        payload: {}
    }
}

export const addNextConnectionTime = (weekDate: WeekDate) => {
    return{
        type: ADD_NEXT_CONNECTION_TIME,
        payload: weekDate
    }
}

export const resetNextConnectionTime = () => {
    return{
        type: RESET_NEXT_CONNECTION_TIME,
        payload: {}
    }
}