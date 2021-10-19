import { combineReducers } from "@reduxjs/toolkit";

import mobileAnimationReducer from "./mobileAnimationReducer";
import dataReducer from "./dataReducer";
import {selectDataReducer} from "./selectDataReducer";
import connectionDateReducer from "./connectionDateReducer";
import pathReducer from "./pathReducer";

export const rootReducer = combineReducers({
    mobileAnimation: mobileAnimationReducer,
    data: dataReducer,
    selectedData: selectDataReducer,
    connection: connectionDateReducer,
    path: pathReducer
})

export type RootState = ReturnType<typeof rootReducer>