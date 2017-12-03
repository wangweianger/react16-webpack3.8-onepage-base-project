import util from 'common/js/util'
import { baseApi } from 'common/js/config'
import { 
    GET_CART_NUMBER,
    UPDATE_CART_NUMBER,
} from '../actionTypes'


// 获得购物车数量
export const getCartNumber = () => {
    return (dispatch)=>{
        util.ajax(baseApi+'native/cart/getTotalCartList',  (data)=> {
            if (data.code === 1000) {
                dispatch({
                    type: UPDATE_CART_NUMBER,
                    number:data.data.cartCount
                })
            }
        }) 
    }
}

// 更新购物车数量
export const updateCartNumber_1 = (number) => {
    return { type: UPDATE_CART_NUMBER, number }
}

