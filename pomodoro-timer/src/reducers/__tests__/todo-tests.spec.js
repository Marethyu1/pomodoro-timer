
import todoReducer from "../todo"
import {addTodo} from "../../actions/todo-actions";

describe("The todo reducer", () => {
    const expectedInitialState = {
        todos: []
    }

    it("Should have an expected initial state", () => {
        expect(todoReducer(undefined, {})).toEqual(expectedInitialState)
    })

    it("Should have no todos in its initial state", () => {
        const {todos} = todoReducer(undefined, {})
        expect(todos.length).toBe(0)
    })

    it("Should be able to add a todo", () => {
        const myTodo = {
            id: 1,
            created: Date.now(),
            category: "personal",
            description: "Finishing marking",
            completed: false,
        }
        const action = addTodo(myTodo)
        const {todos} = todoReducer(undefined, action)
        expect(todos.length).toBe(1)
        const {id} = todos[0]
        expect(id).toBe(myTodo.id)
    })

    describe("adding multiple todos", () => {
        const aTodo = {
            id: 1,
            created: Date.now(),
            category: "personal",
            description: "Finishing marking",
            completed: false,
        }

        const anotherTodo = {
            ...aTodo,
            id: 2
        }

        const action = addTodo(anotherTodo)
        let initialState = {}

        beforeAll(() => {
            initialState = {todos: [aTodo]}
        })

        it("Should be able to add multiple todos", () => {
            const {todos} = todoReducer(initialState, action)
            expect(todos.length).toBe(2)
        })

        it("Should retain order when adding multiple todos", () => {
            const {todos} = todoReducer(initialState, action)
            const firstTodo = todos[0]
            const secondTodo = todos[1]
            expect(firstTodo.id).toBe(aTodo.id)
            expect(secondTodo.id).toBe(anotherTodo.id)
        })

    })


})
