import {SET_TIME_LEFT} from "../actions/timer-actions";

const SECONDS = 60
const MILLISECONDS = 1000
export const TWENTY_FIVE_MINUTES = 25 * SECONDS * MILLISECONDS



const initialState = {
    timeLeft: TWENTY_FIVE_MINUTES
}


const timerReducer = (state=initialState, action) =>  {
    switch (action.type) {
        case SET_TIME_LEFT: {
            return {
                ...state,
                timeLeft: action.payload
            }
        }
    }

    return state
}

export default timerReducer
