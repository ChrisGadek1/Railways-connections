import React from 'react';
import {Provider} from 'react-redux'
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
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Nav/>
                        <Content/>
                        <PopupWrapper />
                    </BrowserRouter>
                </div>
            </Provider>


  );
}

export default App;
