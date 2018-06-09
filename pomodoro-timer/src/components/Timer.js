import React, {Component} from 'react';
import DefaultButton from "./DefaultButton"
import moment from "moment"
import createNotification from "../lib/notifications"

const SECONDS = 60
const MILLISECONDS = 1000
const TWENTY_FIVE_MINUTES = 25 * SECONDS * MILLISECONDS


const defaultState = {
    timeLeft: TWENTY_FIVE_MINUTES,
    startTime: null,
    endTime: null,
    inProgress: false,
    intervalIds: [],
    lastTimeSelected: TWENTY_FIVE_MINUTES
}

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = defaultState
    }

    setTimerLength(minutes){
        this.reset()
        const timeInMS = minutes * SECONDS * MILLISECONDS
        this.setState({
            timeLeft: timeInMS,
            lastTimeSelected: timeInMS
        })
    }

    getMinutesAndSeconds(ms){
        let minutes = Math.max(0, Math.floor(ms / 60000) % 60)
        let seconds =  Math.max(0, Math.round((ms / 1000) % 60))

        if (seconds === 60){
            seconds = 0
            minutes++
        }

        const addZeroIfNecessary = (value) => {
            let output  = String(value)
            if (output.length === 1) {
                output = "0" + output
            }
            return output
        }

        let convertedMinutes = addZeroIfNecessary(minutes)
        let convertedSeconds = addZeroIfNecessary(seconds)

        document.title = `${convertedMinutes}:${convertedSeconds} Pomodoro Timer`

        return `${convertedMinutes}:${convertedSeconds}`
    }

    tick(){
        const timerId = setInterval(() => {
            const currentTime = moment()
            const endTime = moment(this.state.endTime)
            const timeLeft = endTime.diff(currentTime)


            if (timeLeft < 0) {
                this.clearTimers()
                createNotification("Your time is up!")
                this.reset()
            }

            this.setState({
                timeLeft: timeLeft
            })
        }, 1000)

        this.setState((prev, props) => ({
            intervalIds: [...prev.intervalIds, timerId]
        }))
    }

    start(){
        let startTime = moment()
        let endTime = moment(startTime.toDate()).add(this.state.timeLeft, 'ms')
        let timeLeft = endTime.diff(startTime)

        this.setState({
            inProgress: true,
            startTime: startTime,
            endTime: endTime,
            timeLeft: timeLeft,
        })
        this.tick()

    }

    clearTimers(){
        this.state.intervalIds.forEach(id => {
            clearInterval(id)
        })

        this.setState({
            intervalIds: []
        })
    }

    pause(){
        this.setState({
            inProgress: false
        })
        this.clearTimers()
    }

    reset(){
        this.clearTimers()
        this.setState((prev) => ({
            ...defaultState,
            timeLeft: prev.lastTimeSelected,

        }))
    }

    render() {

        let timerControl = this.state.inProgress
            ? <DefaultButton onClick={() =>this.pause()}>Pause</DefaultButton>
            : <DefaultButton onClick={() =>this.start()}>Start</DefaultButton>


        return (
            <div>
                <DefaultButton onClick={() =>this.setTimerLength(25)}>Pomodoro</DefaultButton>
                <DefaultButton onClick={() =>this.setTimerLength(0.01)}>Short Break</DefaultButton>
                <DefaultButton onClick={() =>this.setTimerLength(10)}>Long Break</DefaultButton>
                <br/>
                <h1 style={{"font-size":50}}>{this.getMinutesAndSeconds(this.state.timeLeft)}</h1>
                <br/>
                {timerControl}
                <DefaultButton onClick={() => this.reset()}>Reset</DefaultButton>
            </div>
        );
    }
}


export default Timer;
