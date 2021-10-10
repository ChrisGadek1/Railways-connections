import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux'
import { store } from "../../store/store";

import './App.css';
import Nav from "../Nav/Nav";
import Content from "../Content/Content";
import {BrowserRouter} from "react-router-dom";
import PopupWrapper from "../PopupWrapper/PopupWrapper";

function App() {

    return (
        <Provider store={store}>
            <div className="App" data-testid="app">
                <BrowserRouter>
                    <Nav/>
                    <Content/>
                    <PopupWrapper />
                </BrowserRouter>
            </div>
        </Provider>

  );
}

export default App;
