import { combineReducers } from "@reduxjs/toolkit";

import mobileAnimationReducer from "./mobileAnimationReducer";
import dataReducer from "./dataReducer";

export const rootReducer = combineReducers({
    mobileAnimation: mobileAnimationReducer,
    data: dataReducer
})

export type RootState = ReturnType<typeof rootReducer>