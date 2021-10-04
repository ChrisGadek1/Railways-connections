import React from 'react';
import { Provider } from 'react-redux'
import { store } from "../../store/store";

import './App.css';
import Nav from "../Nav/Nav";
import Content from "../Content/Content";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
        <div className="App" data-testid="app">
            <BrowserRouter>
                <Nav />
                <Content/>
            </BrowserRouter>
        </div>
      </Provider>

  );
}

export default App;
