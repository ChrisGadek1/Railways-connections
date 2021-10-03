import {createStore} from "@reduxjs/toolkit";

import {rootReducer} from "../reducers/rootReducer";

export const store = createStore(rootReducer);