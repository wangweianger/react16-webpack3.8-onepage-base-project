// @flow
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,combineReducers } from 'redux'
import reducers from './redux/store'
import App from './App'
import { routerReducer } from 'react-router-redux'

//公用样式文件
require('./assets/common/css/base.scss'); 
 
// 创建 Redux 的 store 对象
const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer
  })
)

render(
    <Provider store={store} >  
        <App /> 
    </Provider>,
    document.getElementById("app")
)
