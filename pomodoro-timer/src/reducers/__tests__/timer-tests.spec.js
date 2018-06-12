import * as store from "../index"

import { addOne, addX } from "../../actions/timer-actions"
import timerReducer from "../../reducers/timer"


describe("The timer reducer", () => {
    const intialState = {
        counter: 0
    }

    it("should have an simple initial state", () => {

        expect(timerReducer(undefined, {})).toEqual(intialState)
    })

    it("should be able to add one to a number", () => {
        const action = addOne()
        expect(timerReducer(undefined, action)).toEqual({
            counter: 1
        })
    })

    it("should be able ot add x to a number", () => {
        const expected_amount = 5
        const action = addX(expected_amount)
        expect(timerReducer(undefined, action)).toEqual({
            counter: expected_amount
        })

    })
})
