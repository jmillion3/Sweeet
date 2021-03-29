import axios from 'axios';

const initialState = {
    cart: {}
}

const GET_CART = "GET_CART";

// export function getCart(cart){
//     return {
//         type: GET_CART,
//         payload: cart
//     }
// }

export function getCart(){
    const cart = axios.get('/cart/get').then(res => res.data)
    return {
        type: GET_CART,
        payload: cart
    }
}

export default function cartReducer(state = initialState, action){
    switch(action.type){
        case GET_CART + "_PENDING":
            return state;
        case GET_CART + "_FULFILLED":
            return {...state, cart: action.payload};
        case GET_CART + "_REJECTED":
            return initialState;
        default:
            return state
    }
}