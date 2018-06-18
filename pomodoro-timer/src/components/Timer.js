import React, {Component} from 'react';
import DefaultButton from "./DefaultButton"
import moment from "moment"
import createNotification from "../lib/notifications"
import { connect } from "react-redux"
import {setTimeLeft} from "../actions/timer-actions"

const SECONDS = 60
const MILLISECONDS = 1000

const minutesToSeconds = (x) => x * SECONDS * MILLISECONDS

const TWENTY_FIVE_MINUTES = minutesToSeconds(25)
const TEN_MINUTES = minutesToSeconds(10)



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
                <DefaultButton onClick={() =>this.props.setTimeLeft(TWENTY_FIVE_MINUTES)}>Pomodoro</DefaultButton>
                <DefaultButton onClick={() =>this.props.setTimeLeft(1000)}>Short Break</DefaultButton>
                <DefaultButton onClick={() =>this.props.setTimeLeft(TEN_MINUTES)}>Long Break</DefaultButton>
                <br/>
                <h1 style={{"fontSize":50}}>{this.getMinutesAndSeconds(this.props.timer.timeLeft)}</h1>
                <br/>
                {timerControl}
                <DefaultButton onClick={() => this.reset()}>Reset</DefaultButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timer: state.timer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTimeLeft: (timeLeft) => dispatch(setTimeLeft(timeLeft))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
