<template>
    <div class="bottom-bar">
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
                <van-goods-action-icon icon="shop-o" text="店铺" />
                <van-goods-action-icon icon="star-o" text="已收藏" color="#ff5000" />
                <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
                <van-goods-action-button type="danger" text="立即购买" />
            </van-goods-action>
    </div>
</template>
<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
export default {
    name:'detailBottomBar',
    props: {

    },
    data () {
        return {
            
        }
    },
    methods: {
        addCart() {
            // 组件子元素的事件发送给父组件
            this.$emit('addCart')
        }
    }
}
</script>
<style scoped>

</style>