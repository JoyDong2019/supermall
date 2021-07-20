<template>
    <div class="cart-list-item">
        <checkbox :isChecked="product.checked"  class="check-icon" @click.native="changeChecked"></checkbox>
        <van-card class="card"
            :num="product.count"
            :price="product.price"
            :desc="product.desc"
            :title="product.title"
            :thumb="product.image"
        />
       
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Checkbox from 'components/common/checkbox/checkbox.vue'

export default {
    name:'cartListItem',
    props: {
        product:{
            type:Object,
            default() {
                return {}
            }
        }
    },
    components: {
      Checkbox  
    },
    computed: {
      ...mapGetters(['cartList']) , 
       // 根据商品传来的checked属性 来决定是否选中
       
    },

    data () {
        return {
           
        }
    },
    methods: {
        changeChecked() {
            this.product.checked = !this.product.checked
        }
    },
  
}
</script>
<style scoped>
.cart-list-item {
    width: 100vw;
    
}
.check-icon {
    position: relative;
    left: 10px;
    top: 40px;
    z-index: 9;
}
.card {
    /* float: left; */
    /* width: calc( 100% - 35px ); */
    /* left: 25px; */
}
</style>