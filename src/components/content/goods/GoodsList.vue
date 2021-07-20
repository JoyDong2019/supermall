<template>
    <div class="goods">
        <!-- 每一个item是一个object。需要传给子组件 -->
        <goods-list-item  class="goods-item" v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'

export default {
    name:"GoodsList",
    components: {
        
        GoodsListItem
    },
    props: {
        goods:{
            type:Array,
            default() {
                return []
            }
        }
    }
}
</script>
<style scoped>
.goods {
    /* 允许换行 给子元素设置宽度 就可以一行放两个 */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}

</style>