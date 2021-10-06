import {ActionType} from "../actions/actionType";
import {LOAD_DATA} from "../actions/dataProviderActions";

const dataReducer = (state = {stations: [], lines: []}, action: ActionType) => {
    switch (action.type) {
        case LOAD_DATA:
            return action.payload
        default:
            return {stations: [], lines: []}
    }
}

export default dataReducer;