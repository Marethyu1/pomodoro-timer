import {SET_TIMER_LENGTH,
    TICK_TIMER,
    SET_END_TIME,
    SET_TIMER_ID,
    CLEAR_TIMERS,
    SET_IN_PROGRESS,
    SET_TIMER_TO_ZERO,
    START_SESSION,
    STOP_SESSION,
} from "../actions/timer-actions";
import moment from "moment"

const SECONDS = 60
const MILLISECONDS = 1000
export const TWENTY_FIVE_MINUTES = 25 * SECONDS * MILLISECONDS

const initialState = {
    timeLeft: TWENTY_FIVE_MINUTES,
    timerLength: TWENTY_FIVE_MINUTES,
    endTime: null,
    timerIDs: [],
    inProgress: false,
    sessionInProgress: false,
}

const timeDifference = (endTime) => {
    const currentMoment = moment()
    const endMoment = moment(endTime)
    return endMoment.diff(currentMoment)
}

const timerReducer = (state=initialState, action) =>  {
    switch (action.type) {
        case TICK_TIMER: {
            const timeLeft = timeDifference(state.endTime)
            return {
                ...state,
                timeLeft: timeLeft
            }
        }
        case SET_TIMER_LENGTH: {
            return {
                ...state,
                timeLeft: action.payload,
                timerLength: action.payload
            }
        }
        case SET_END_TIME: {
            let startTime = moment()
            let endTime = startTime.add(action.payload, 'ms')
            return {
                ...state,
                endTime: endTime.valueOf()
            }
        }
        case SET_TIMER_ID: {
            return {
                ...state,
                timerIDs: [...state.timerIDs, action.payload]
            }
        }

        case CLEAR_TIMERS: {
            const {timerIDs} = state
            timerIDs.forEach(id => {
                clearInterval(id)
            })

            return {
                ...state,
                timerIDs: []
            }
        }

        case SET_IN_PROGRESS: {
            return {
                ...state,
                inProgress: action.payload
            }
        }

        case SET_TIMER_TO_ZERO: {
            return {
                ...state,
                timeLeft: 0,
                sessionInProgress: false,
                inProgress: false,

            }
        }

        case START_SESSION: {
            return {
                ...state,
                sessionInProgress: true
            }
        }

        case STOP_SESSION: {
            return {
                ...state,
                sessionInProgress: false,
            }
        }
    }

    return state
}

export default timerReducer
