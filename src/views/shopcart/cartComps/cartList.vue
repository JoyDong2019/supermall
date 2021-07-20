<template>
    <div class="cart-list">
          <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
    </div>
</template>
<script>
import CartListItem from './cartListItem.vue'

export default {
    name:'cartList',
    props: {
        cartList:{
            type:Array,
            default() {
                return []
            }
        }
    },
    data () {
        return {
            
        }
    },
    components: {
        CartListItem
        
    }
}
</script>
<style scoped>


</style>