import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
const state = {
    cartList: []
}
export default new Vuex.Store({
    state,
    mutations,
    // payload __ 新添加的商品
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }

    getters,
    actions,
    modules: {}
})