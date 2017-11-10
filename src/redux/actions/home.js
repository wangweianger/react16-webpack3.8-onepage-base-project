import * as actionTypes from '../actionTypes'

/*
 * action 创建函数
 */
export function addTodo(text) {
    return { type: actionTypes.ADD_TODO, text }
}

export function completeTodo(index) {
    return { type: actionTypes.COMPLETE_TODO, index }
}

