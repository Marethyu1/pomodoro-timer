
import { ADD_TODO } from "../actions/todo-actions";


const initialState = {
    todos: [{category: "seng302", description:"marking"}],
}

const todoReducer = (state=initialState, action) => {

    switch (action.type){

        case ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        }

        default: {
            return state
        }
    }

    return state
}

export default todoReducer
