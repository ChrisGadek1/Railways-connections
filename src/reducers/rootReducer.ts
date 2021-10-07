import { combineReducers } from "@reduxjs/toolkit";

import mobileAnimationReducer from "./mobileAnimationReducer";
import dataReducer from "./dataReducer";
import {selectDataReducer} from "./selectDataReducer";

export const rootReducer = combineReducers({
    mobileAnimation: mobileAnimationReducer,
    data: dataReducer,
    selectedData: selectDataReducer
})

export type RootState = ReturnType<typeof rootReducer>