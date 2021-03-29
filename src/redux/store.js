import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import promiseMiddleware from 'redux-promise-middleware';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
