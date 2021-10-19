import initialState from "./initialState";
import {ActionType} from "../actions/actionType";
import {
    ADD_NEXT_CONNECTION_TIME,
    ADD_PATH,
    INCREASE_MAX_PATHS,
    REMOVE_ALL_PATHS,
    RESET_MAX_PATHS, RESET_NEXT_CONNECTION_TIME
} from "../actions/pathsActions";

const pathReducer = (state:typeof initialState = initialState, action: ActionType) => {
    switch (action.type){
        case ADD_PATH:
            return{
                ...state,
                paths: [...state.paths, action.payload]
            }
        case REMOVE_ALL_PATHS:
            return {
                ...state,
                paths: []
            }
        case INCREASE_MAX_PATHS:
            return{
                ...state,
                maxPaths: state.maxPaths + action.payload
            }
        case RESET_MAX_PATHS:
            return {
                ...state,
                maxPaths: 3
            }
        case ADD_NEXT_CONNECTION_TIME:
            return {
                ...state,
                nextConnectionTime: action.payload
            }
        case RESET_NEXT_CONNECTION_TIME:
            return {
                ...state,
                nextConnectionTime: null
            }
        default:
            return state
    }
}

export default pathReducer;