import createNotification from "../lib/notifications"

export const TICK_TIMER = "[timer] TICK_TIMER"
export const SET_TIMER_LENGTH = "[timer] SET_TIMER_LENGTH"
export const SET_END_TIME = "[timer] SET_END_TIME"
export const SET_TIMER_ID = "[timer] SET_TIMER_ID"
export const CLEAR_TIMERS = "[timer] CLEAR_TIMERS"
export const SET_IN_PROGRESS = "[timer] SET_IN_PROGRESS"
export const SET_TIMER_TO_ZERO = "[timer] SET_TIMER_TO_ZERO"
export const START_SESSION = "[timer] START_SESSION"
export const STOP_SESSION = "[timer] STOP_SESSION"

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
        const {timerIDs, inProgress} = getState().timer
        if (timerIDs.length) return
        if (!inProgress) dispatch(setInProgress(true))
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
        dispatch(startSession())
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
        dispatch(setTimerLength(25*1000*60))
        dispatch(setInProgress(false))
        dispatch(stopSession())
    }
}


export const stopSession = () => {
    return {
        type: STOP_SESSION
    }
}

export const startSession = () => {
    return {
        type: START_SESSION
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
