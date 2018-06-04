import React, {Component} from 'react';
import DefaultButton from "./DefaultButton"


class Timer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <DefaultButton>Pomodoro</DefaultButton>
                <DefaultButton>Short Break</DefaultButton>
                <DefaultButton>Long Break</DefaultButton>
            </div>
        );
    }
}


export default Timer;
