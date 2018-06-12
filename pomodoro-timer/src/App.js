import React, { Component } from 'react';
import './App.css';
import MenuBar from "./components/MenuBar"
import Timer from "./components/Timer"
import { Provider } from 'react-redux'
import store from "./store"


class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
              <MenuBar/>
              <Timer/>
          </div>
        </Provider>
    );
  }
}

export default App;
