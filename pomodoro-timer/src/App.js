import React, { Component } from 'react';
import './App.css';
import MenuBar from "./components/MenuBar"
import Timer from "./components/Timer"

class App extends Component {
  render() {
    return (
      <div className="App">
          <MenuBar/>
          <Timer/>
      </div>
    );
  }
}

export default App;
