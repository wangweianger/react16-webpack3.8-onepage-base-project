import { createStore , applyMiddleware , combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

import home from './home'
import cart from './cart'

const reducers = combineReducers({
    routing: routerReducer,
    home,
    cart,
})

// 创建 Redux 的 store 对象
const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store