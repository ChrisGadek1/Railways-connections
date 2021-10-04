import { combineReducers } from "@reduxjs/toolkit";

import mobileAnimationReducer from "./mobileAnimationReducer";

export const rootReducer = combineReducers({
    mobileAnimation: mobileAnimationReducer
})

export type RootState = ReturnType<typeof rootReducer>