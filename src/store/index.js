import { rootReducer } from "../reducers";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));

export default store;