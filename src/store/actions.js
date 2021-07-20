import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'
export default {
    // Actions可以返回一个Promise
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 1 查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                // 2 判断oldProduct
            if (oldProduct) {
                // 2.1 添加已存在的商品
                context.commit(ADD_COUNTER, oldProduct)
                resolve('成功添加已存在商品')
            } else {
                // 2.2 添加新品
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('成功添加新的商品')
            }
        })
    }
}