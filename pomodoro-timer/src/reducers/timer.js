
const initialState = {
    counter: 0
}

const timerReducer = (state=initialState, action) =>  {
    switch (action.type) {
        case "ADD_ONE": {
            return {
                ...state,
                counter: state.counter + 1
            }
        }

        case "ADD_X": {
            return {
                ...state,
                counter: state.counter + action.payload
            }
        }
    }

    return state
}

export default timerReducer
