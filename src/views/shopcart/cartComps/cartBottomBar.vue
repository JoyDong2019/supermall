<template>
    <div class="cart-bottom-bar">
        <van-submit-bar :price="totalPrice" :button-text="text"  @submit="onSubmit">
            <checkbox :isChecked="checked" @click.native="selectAll">
                全选
            </checkbox>

        </van-submit-bar>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Checkbox from 'components/common/checkbox/checkbox.vue'
export default {
    name:'cartBottomBar',
   data () {
       return {
           
       }
   },
  
    computed: {
         ...mapGetters(['cartList']),  
        text() {
            return '提交订单(' + this.cartList.filter(item=>item.checked).length+ ')'
        },
        totalPrice() {
           let res = this.cartList.filter(item => {return item.checked})
            .reduce((pre,item)=> 
            {
              return  pre + item.price * item.count
            },0)
            .toFixed(2)
            return Number(res)*100
        },
        checked() {
            
            if(this.cartList.length === 0) {
                return false
            }
            // length不为0，判断布尔值则为true
            // 这里判断有没有没被选中的，有，（）内就为非0值，取反，则为false
            // 法1
            // return !(this.cartList.filter(item => !item.checked).length)
            // 法2 性能更高
            return !this.cartList.find(item=>!item.checked)
        }
    },
    components: {
        Checkbox
        
    },
    mounted () {
        // console.log(this.cartList[0].price);
        // console.log(this.checked);
    },
    methods: {
        selectAll() {
            if(this.checked) {
                this.cartList.forEach(item=>item.checked = false)
            } else {
                this.cartList.forEach(item=>item.checked = true)

            }
        },
        onSubmit() {
            if(!this.checked) {
                this.$toast.show('有商品未选中！')
            }else {
                this.$toast.show('已提交')
            }
        }
    }
}
</script>
<style scoped>
.van-submit-bar {
    bottom: 60px;
    
}
</style>