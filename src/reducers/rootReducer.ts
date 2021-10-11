import { combineReducers } from "@reduxjs/toolkit";

import mobileAnimationReducer from "./mobileAnimationReducer";
import dataReducer from "./dataReducer";
import {selectDataReducer} from "./selectDataReducer";
import connectionDateReducer from "./connectionDateReducer";

export const rootReducer = combineReducers({
    mobileAnimation: mobileAnimationReducer,
    data: dataReducer,
    selectedData: selectDataReducer,
    connection: connectionDateReducer
})

export type RootState = ReturnType<typeof rootReducer>