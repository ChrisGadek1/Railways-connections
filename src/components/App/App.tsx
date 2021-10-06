import React, {useEffect} from 'react';
import { Provider } from 'react-redux'
import { store } from "../../store/store";

import './App.css';
import Nav from "../Nav/Nav";
import Content from "../Content/Content";
import {BrowserRouter} from "react-router-dom";
import DataProvider from "../../services/dataProvider/DataProvider";

function App() {

    useEffect(() => {
        const dataProvider = DataProvider.getInstance();
    }, [])

    return (
        <Provider store={store}>
            <div className="App" data-testid="app">
                <BrowserRouter>
                    <Nav/>
                    <Content/>
                </BrowserRouter>
            </div>
        </Provider>

  );
}

export default App;
