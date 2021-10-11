import initialState from "./initialState";
import {ActionType} from "../actions/actionType";
import {
    ADD_BEGIN_STATION, ADD_DEPARTURE_TIME,
    ADD_END_STATION,
    REMOVE_BEGIN_STATION, REMOVE_DEPARTURE_TIME,
    REMOVE_END_STATION
} from "../actions/connectionDataActions";


const connectionDataReducer =  (state:typeof initialState = initialState, action: ActionType)  => {
    switch (action.type){
        case ADD_BEGIN_STATION:
            return{
                ...state,
                beginStation: action.payload
            }
        case REMOVE_BEGIN_STATION:
            return{
                ...state,
                beginStation: null
            }
        case ADD_END_STATION:
            return{
                ...state,
                endStation: action.payload
            }
        case REMOVE_END_STATION:
            return{
                ...state,
                endStation: null
            }
        case ADD_DEPARTURE_TIME:
            return{
                ...state,
                departureTime: action.payload
            }
        case REMOVE_DEPARTURE_TIME:
            return{
                ...state,
                departureTime: null
            }
    }
}

export default connectionDataReducer;