import { combineReducers } from "@reduxjs/toolkit";

import mobileAnimationReducer from "./mobileAnimationReducer";

export const rootReducer = combineReducers({
    mobileAnimation: mobileAnimationReducer
})