import {ActionType} from "../actions/actionType";
import {LOAD_DATA} from "../actions/dataProviderActions";
import initialState from "./initialState";

const dataReducer = (state:typeof initialState = initialState, action: ActionType) => {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default dataReducer;