export const UPDATE_TIME_LEFT = "UPDATE_TIME_LEFT"
export const SET_TIMER_LENGTH = "SET_TIMER_LENGTH"
export const START_TIMER = "START_TIMER"
export const SET_END_TIME = "SET_END_TIME"
export const SET_TIMER_ID = "SET_TIMER_ID"
export const CLEAR_TIMERS = "CLEAR_TIMERS"
export const SET_IN_PROGRESS = "SET_IN_PROGRESS"

export const updateTimeLeft = () => ({
    type: UPDATE_TIME_LEFT,
})

export const setEndTime = () => ({
    type: SET_END_TIME,
})

export const setInProgress = (inProgress) => {
    return {
        type: SET_IN_PROGRESS,
        payload: inProgress
    }
}

export const startTimer = () => {
    return dispatch => {
        dispatch(setEndTime())
        dispatch(setInProgress(true))
        dispatch(updateTimeLeft())
        const timerId = setInterval(() => {
            dispatch(() => {
                dispatch(updateTimeLeft())
            })
        }, 1000)
        dispatch(setTimerId(timerId))
    }
}
//TODO make start and resume functionally the same

export const pauseTimer = () => {
    return dispatch => {
        dispatch(clearTimers())
        dispatch(setInProgress(false))
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
