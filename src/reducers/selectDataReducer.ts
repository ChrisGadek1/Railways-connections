import initialState from "./initialState";
import {ActionType} from "../actions/actionType";
import {ADD_LINE, ADD_STATION, REMOVE_LINE, REMOVE_STATION} from "../actions/selectDataActions";
import Station from "../data/classes/Station";
import Line from "../data/classes/Line";

export const selectDataReducer = (state: typeof initialState = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_STATION:
            return{
                ...state,
                selectedStations: [...state.selectedStations, action.payload]
            }
        case REMOVE_STATION:
            return{
                ...state,
                selectedStations: state.selectedStations.filter((station: Station) => station.id !== action.payload)
            }
        case ADD_LINE:
            return{
                ...state,
                selectedLines: [...state.selectedLines, action.payload]
            }
        case REMOVE_LINE:
            return {
                ...state,
                selectedLines: state.selectedLines.filter((line: Line) => line.name !== action.payload)
            }
        default:
            return state
    }
}