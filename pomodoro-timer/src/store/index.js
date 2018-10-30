import {createStore, applyMiddleware, compose} from "redux"
import reducers from "../reducers"
import logger from "redux-logger"
import thunk from "redux-thunk"

const middlewares = [thunk, logger]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
)

export default createStore(reducers, enhancer)
