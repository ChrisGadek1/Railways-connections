import React from 'react';
import { Provider } from 'react-redux'
import { store } from "../../store/store";

import './App.css';
import Nav from "../Nav/Nav";

function App() {
  return (
      <Provider store={store}>
        <div className="App" data-testid="app">
          <Nav />
        </div>
      </Provider>

  );
}

export default App;
