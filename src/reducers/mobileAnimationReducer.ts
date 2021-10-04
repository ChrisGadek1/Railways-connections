import {
    SHOW, HIDE
} from "../actions/mobileAnimationActions";
import {ActionType} from "../actions/actionType";

const mobileAnimationReducer = (state = false, action: ActionType) => {
    switch (action.type){
        case SHOW:
            return true
        case HIDE:
            return false
        default:
            return state
    }
}

export default mobileAnimationReducer;