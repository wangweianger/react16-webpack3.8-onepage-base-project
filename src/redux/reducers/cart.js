import { 
    UPDATE_CART_NUMBER,
    GET_CART_NUMBER,
} from '../actionTypes'

const initialState = {
    number:0
}

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_CART_NUMBER:
        return { state, number: action.number }   
    case UPDATE_CART_NUMBER:
        return { state, number: action.number }
    default:
        return state
    }
} 