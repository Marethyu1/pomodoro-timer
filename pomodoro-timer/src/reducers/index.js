import { combineReducers } from 'redux'
import timer from "./timer"
import todo from "./todo"

const reducers = combineReducers({
    timer,
    todo
})

export default reducers
