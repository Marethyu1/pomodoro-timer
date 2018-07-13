
export const ADD_TODO = "[todo] ADD_TODO"
export const REMOVE_TODO = "[todo] REMOVE_TODO"

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const removeTodo = (id) => {
    return {
        type: REMOVE_TODO,
        payload: id
    }
}

