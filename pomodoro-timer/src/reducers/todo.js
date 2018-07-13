
import { ADD_TODO, REMOVE_TODO } from "../actions/todo-actions";


const initialState = {
    todos: [{category: "seng302", description:"marking", id:1}],
}

const todoReducer = (state=initialState, action) => {

    switch (action.type){

        case ADD_TODO: {
            const todo = {
                ...action.payload,
                id: state.todos.length + 1
            }

            return {
                ...state,
                todos: [...state.todos, todo]
            }
        }

        case REMOVE_TODO: {
            return {
                ...state,
                todos: [...state.todos.filter(x => x.id !== action.payload)]
            }
        }

        default: {
            return state
        }
    }

    return state
}

export default todoReducer
