import { setTimerLength, updateTimeLeft } from "../../actions/timer-actions"
import timerReducer, {TWENTY_FIVE_MINUTES} from "../timer"


describe("The timer reducer", () => {
    const initialState = {
        timeLeft: TWENTY_FIVE_MINUTES,
        timerLength: TWENTY_FIVE_MINUTES,
        endTime: null,
    }

    it("should have an simple initial state", () => {
        expect(timerReducer(undefined, {})).toEqual(initialState)
    })

    it("Should be able to set the timer length", () => {
        const expectedTimerLength = 10000
        const action = setTimerLength(expectedTimerLength)
        const {timerLength} = timerReducer(undefined, action)

        expect(expectedTimerLength).toBe(timerLength)
    })

    it("Should update the time left when setting the timer length", () => {
        const expectedTimerLength = 10000
        const expectedTimeLeft = expectedTimerLength
        const action = setTimerLength(expectedTimerLength)
        const {timeLeft} = timerReducer(undefined, action)

        expect(expectedTimeLeft).toBe(timeLeft)
    })

    it("Should be able to update the time left", () => {
        const endTime = Date.now() + 10000
        const action = updateTimeLeft(endTime)
        const {timeLeft} = timerReducer(undefined, action)
        console.log(timeLeft)
    })
})
