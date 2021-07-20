import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'
export default {
    // mutations唯一的目的就是修改state中的状态
    // 里面每个方法功能尽量单一
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        // 添加商品后 就添加一个属性————选中
        payload.checked = true
        state.cartList.push(payload)
    },
    changeChecked(state, payload) {
        payload.checked = !payload.checked
    }
}