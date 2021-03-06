import React, {Component} from 'react';
import DefaultButton from "./DefaultButton"
import { connect } from "react-redux"
import {setTimerLength, startTimer, pauseTimer, resumeTimer, stopTimer} from "../actions/timer-actions"

// const SECONDS = 60
// const MILLISECONDS = 1000

// const minutesToSeconds = (x) => x * SECONDS * MILLISECONDS

// const TWENTY_FIVE_MINUTES = minutesToSeconds(25)
// const TEN_MINUTES = minutesToSeconds(10)

class Timer extends Component {
    // constructor(props) {
    //     super(props)
    // }

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

    render() {

        const startOrResumeTimer = (sessionInProgress) => {
            if (sessionInProgress) {
                this.props.resumeTimer()
            } else {
                this.props.startTimer()
            }
        }

        const startOrResume = this.props.timer.sessionInProgress ? "Resume" : "Start"

        let timerControl = this.props.timer.inProgress
            ? <DefaultButton onClick={() =>this.props.pauseTimer()}>Pause</DefaultButton>
            : <DefaultButton onClick={() => startOrResumeTimer(this.props.timer.sessionInProgress)}>{startOrResume}</DefaultButton>

        let stopStart = !this.props.timer.sessionInProgress

        const StopButton = <DefaultButton extra={{disabled: stopStart}} onClick={() => {this.props.stopTimer()}}>Stop</DefaultButton>
        const DoneButton = <DefaultButton onClick={() => {}}>Done</DefaultButton>

        const shouldRenderStop = this.props.timer.inProgress || !this.props.timer.sessionInProgress

        let stopOrDoneButton = shouldRenderStop ? StopButton : DoneButton

        return (
            <div>
                {/*<DefaultButton onClick={() =>this.props.setTimerLength(TWENTY_FIVE_MINUTES)}>Pomodoro</DefaultButton>*/}
                {/*<DefaultButton onClick={() =>this.props.setTimerLength(1000)}>Short Break</DefaultButton>*/}
                {/*<br/>*/}
                <p style={{"fontSize":"80px", "font-weight": "lighter"}}>{this.getMinutesAndSeconds(this.props.timer.timeLeft)}</p>
                {/*<br/>*/}
                {/*{thing}*/}
                {this.props.todoExists &&
                    <div>
                        <p style={{color: "#f3c3c2"}}>
                            {this.props.todos[0].description}
                        </p>
                    </div>
                }

                {timerControl}
                {stopOrDoneButton}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timer: state.timer,
        todos: state.todo.todos,
        todoExists: state.todo.todos.length > 0
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTimerLength: (timeLeft) => dispatch(setTimerLength(timeLeft)),
        startTimer: () => dispatch(startTimer()),
        pauseTimer: () => dispatch(pauseTimer()),
        resumeTimer: () => dispatch(resumeTimer()),
        stopTimer: () => dispatch(stopTimer()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
