// @flow
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/reducers'
import App from './App'
// ant css
import 'antd/dist/antd.css'

//公用样式文件
require('common/css/base.scss') 
 
// 弹窗
import popup from 'popup'
import $ from 'jquery'
import config from 'common/js/config'
import util from 'common/js/util'

window.popup 	= popup
window.config 	= config
window.util     = util
window.$ 		= $

	
render(
    <Provider store={store} >  
        <App /> 
    </Provider>,
    document.getElementById('app')
)
