import { setTimeLeft } from "../../actions/timer-actions"
import timerReducer, {TWENTY_FIVE_MINUTES} from "../../reducers/timer"


describe("The timer reducer", () => {
    const initialState = {
        timeLeft: TWENTY_FIVE_MINUTES
    }

    it("should have an simple initial state", () => {
        expect(timerReducer(undefined, {})).toEqual(initialState)
    })

    it("Should be able to manually set the time left", () => {
        const timeLeft = 10000
        const action = setTimeLeft(timeLeft)
        expect(timerReducer(undefined, action)).toEqual({
            ...initialState,
            timeLeft: timeLeft
        })
    })
})
