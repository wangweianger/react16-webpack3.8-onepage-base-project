
import * as actionTypes from '../actionTypes'

const initialState = []

export default function home (state = initialState, action) {
    switch (action.type) {
    case actionTypes.ADD_TODO:
        return [
            ...state,
            {
                text: action.text,
                completed: false
            }
        ]
    case actionTypes.COMPLETE_TODO:
        return [
            ...state.slice(0, action.index),
            Object.assign({}, state[action.index], {
                completed: true
            }),
            ...state.slice(action.index + 1)
        ]
    default:
        return state
    }
}