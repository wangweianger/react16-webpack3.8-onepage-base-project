import { 
    UPDATE_CART_NUMBER,
} from '../actionTypes'


// 更新购物车数量
export const updateCartNumber = (number) => {
    return { type: UPDATE_CART_NUMBER, number }
}