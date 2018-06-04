import React, { Component } from 'react';
import './App.css';
import moment from "moment"

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startTime: null,
            endTime: null,
            timeLeft: 0,
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

        setInterval(() => {
            const currentTime = moment()
            const endTime = moment(this.state.endTime)
            const timeLeft = endTime.diff(currentTime)

            this.setState({
                timeLeft: timeLeft
            })
        }, 1000)

    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pomodoro Timer</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => this.startTimer()}>25 minutes</button>
            <li>Time left: {this.getMinutesAndSeconds(this.state.timeLeft)}</li>
            <li>Start Time: {moment(this.state.startTime).format("h:mm:ss")}</li>
            <li>End Time: {moment(this.state.endTime).format("h:mm:ss")}</li>
        </p>
      </div>
    );
  }
}

export default App;
