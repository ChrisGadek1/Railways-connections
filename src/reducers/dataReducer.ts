import {ActionType} from "../actions/actionType";
import {LOAD_DATA} from "../actions/dataProviderActions";

const dataReducer = (state = {}, action: ActionType) => {
    switch (action.type) {
        case LOAD_DATA:
            return action.payload
        default:
            return {}
    }
}

export default dataReducer;