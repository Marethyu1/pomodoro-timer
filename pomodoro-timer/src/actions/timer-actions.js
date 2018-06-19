import createNotification from "../lib/notifications"


export const TICK_TIMER = "TICK_TIMER"
export const SET_TIMER_LENGTH = "SET_TIMER_LENGTH"
export const SET_END_TIME = "SET_END_TIME"
export const SET_TIMER_ID = "SET_TIMER_ID"
export const CLEAR_TIMERS = "CLEAR_TIMERS"
export const SET_IN_PROGRESS = "SET_IN_PROGRESS"
export const SET_TIMER_TO_ZERO = "SET_TIMER_TO_ZERO"


export const updateTimeLeft = () => ({
    type: TICK_TIMER,
})

export const setEndTime = (endTime) => ({
    type: SET_END_TIME,
    payload: endTime
})

export const setInProgress = (inProgress) => {
    return {
        type: SET_IN_PROGRESS,
        payload: inProgress
    }
}


export const pauseTimer = () => {
    return dispatch => {
        dispatch(clearTimers())
        dispatch(setInProgress(false))
    }
}

const tick = () => {
    return (dispatch, getState) => {
        const {timerIDs} = getState().timer
        if (timerIDs.length) return
        dispatch(setInProgress(true))
        dispatch(updateTimeLeft())
        const timerId = setInterval(() => {
            const {timeLeft} = getState().timer
            if (timeLeft < 1000) {
                createNotification("Your time is up!")
                dispatch(stopTimer())
            } else {
                dispatch(updateTimeLeft())

            }

        }, 1000)
        dispatch(setTimerId(timerId))
    }
}

export const startTimer = () => {
    return (dispatch, getState) => {
        const {timerLength} = getState().timer
        dispatch(setEndTime(timerLength))
        dispatch(tick())
    }
}

export const resumeTimer = () => {
    return (dispatch, getState) => {
        const {timeLeft} = getState().timer
        dispatch(setEndTime(timeLeft))
        dispatch(tick())
    }
}

export const setTimerToZero = () => {
    return {
        type: SET_TIMER_TO_ZERO,
    }
}

export const stopTimer = () => {
    return dispatch => {
        dispatch(clearTimers())
        dispatch(setTimerToZero())
    }

}

export const clearTimers = () => {
    return {
        type: CLEAR_TIMERS
    }
}

export const setTimerId = (id) => {
    return {
        type: SET_TIMER_ID,
        payload: id,
    }
}


export const setTimerLength = (amount) => ({
    type: SET_TIMER_LENGTH,
    payload: amount
})
