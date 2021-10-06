import {
    SHOW, HIDE
} from "../actions/mobileAnimationActions";
import {ActionType} from "../actions/actionType";
import initialState from "./initialState";

const mobileAnimationReducer = (state: typeof initialState = initialState, action: ActionType) => {
    switch (action.type){
        case SHOW:
            return {
                ...state,
                mobileAnimation: true
            }
        case HIDE:
            return {
                ...state,
                mobileAnimation: false
            }
        default:
            return state
    }
}

export default mobileAnimationReducer;