import React, { Component } from 'react';
import './App.css';
import moment from "moment"
import MenuBar from "./components/MenuBar"
import Timer from "./components/Timer"

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startTime: null,
            endTime: null,
            timeLeft: 25*1000*60,
        }
    }

    updateTimer(){
    }

    getMinutesAndSeconds(ms){
        let minutes = Math.floor(ms / 60000) % 60;
        let seconds =  Math.round((ms / 1000) % 60)
        if (seconds < 10) seconds = "0" + seconds
        if (minutes < 10) minutes = "0" + minutes
        return `${minutes}:${seconds}`
    }

    startTimer(){
        let startTime = moment()
        let endTime = moment(startTime.toDate()).add(25, 'minute')
        let timeLeft = endTime.diff(startTime)

        this.setState({
            startTime: startTime,
            endTime: endTime,
            timeLeft: timeLeft,
        })

        const timerId = setInterval(() => {
            const currentTime = moment()
            const endTime = moment(this.state.endTime)
            const timeLeft = endTime.diff(currentTime)

            this.setState({
                timeLeft: timeLeft
            })
        }, 1000)

        console.log(timerId)

    }


  render() {
    return (
      <div className="App">
          <MenuBar/>
          <Timer/>
          <p className="App-intro">
            <button onClick={() => this.startTimer()}>Pomodoro</button>
                <button onClick={() => {}}>Short Break</button>
                <button onClick={() => {}}>Long Break</button>
                Time left: {this.getMinutesAndSeconds(this.state.timeLeft)}
        </p>
      </div>
    );
  }
}

export default App;
