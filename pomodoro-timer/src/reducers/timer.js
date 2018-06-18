import {SET_TIMER_LENGTH,
    UPDATE_TIME_LEFT,
    SET_END_TIME, SET_TIMER_ID} from "../actions/timer-actions";
import moment from "moment"


const SECONDS = 60
const MILLISECONDS = 1000
export const TWENTY_FIVE_MINUTES = 25 * SECONDS * MILLISECONDS

const initialState = {
    timeLeft: TWENTY_FIVE_MINUTES,
    timerLength: TWENTY_FIVE_MINUTES,
    endTime: null,
    timerIDs: []
}

const timeDifference = (endTime) => {
    const currentMoment = moment()
    const endMoment = moment(endTime)
    return endMoment.diff(currentMoment)
}

const timerReducer = (state=initialState, action) =>  {
    switch (action.type) {
        case UPDATE_TIME_LEFT: {
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
            let endTime = moment(startTime.toDate()).add(state.timerLength, 'ms')
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
    }

    return state
}

export default timerReducer
