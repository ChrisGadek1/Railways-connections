import {
    SHOW, HIDE
} from "../actions/mobileAnimationActions";
import {ActionType} from "../actions/actionType";

const mobileAnimationReducer = (state: boolean = false, action: ActionType) => {
    switch (action.type){
        case SHOW:
            return true
        case HIDE:
            return false
    }
}

export default mobileAnimationReducer;