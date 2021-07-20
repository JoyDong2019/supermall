<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <template v-slot:center>
                <div>购物车({{cartLength}})</div>
            </template>
        </nav-bar>
        <scroll class="content" ref="scroll">
            <cart-list :cart-list="cartList"/>                     
        </scroll>
        <cart-bottom-bar class="cart-bottom-bar"/>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './cartComps/cartList.vue'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './cartComps/cartBottomBar.vue'

import {mapGetters} from 'vuex'
export default {
    name:'cart',
    
    data () {
        return {
            
        }
    },
    computed: {
        // 两种语法
        // 1 自定义名字
        // ...mapGetters({
        //     length:'cartLength'
        // })
        // 2 直接映射过来
        ...mapGetters(['cartLength','cartList'])
    },
    components: {
        NavBar,
        Scroll,
        CartList,
        CartBottomBar
    },
    created () {
        
    },
    activated () {
        this.$refs.scroll.refresh()
    }
}
</script>
<style scoped>
.cart {
    height: 100vh;
}
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
}
.content {
    height: calc(100vh - 44px - 60px - 50px);
    overflow: hidden;
}

</style>