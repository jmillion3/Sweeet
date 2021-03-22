import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './userReducer';
import promiseMiddleware from 'redux-promise-middleware';

const rootReducer = combineReducers({
    user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
