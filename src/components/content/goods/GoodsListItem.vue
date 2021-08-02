<template>
    <div class="goods-item" @click="itemClick">
        <img v-lazy="showImage" alt="" @load="imageLoad">
        <!-- @load 当整个页面及所有依赖资源如样式表和图片都已加载完成时，将处罚load事件 -->
        <div>
            <p class="title">{{goodsItem.title}}</p>
            <span class="price">￥{{goodsItem.price}}</span>
            <span class="collect"> {{goodsItem.cfav}} </span>
        </div>
    </div>
</template>
<script>
export default {
    name:"GoodsListItem",
    props: {
        goodsItem:{
            type:Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        imageLoad() {
            // 判断父组件。使得父组件监听属于自己部分的图片加载情况
            // 法1 
            // if(this.$route.path.indexOf('/home') !== -1) {
            //     this.$bus.$emit('homeItemImageLoad')
            // } else if (this.$route.path.indexOf('/detail') !== -1) {
            //     this.$bus.$emit('detailItemImageLoad')
            // }
            // 法2 父组件离开时 取消全局事件的监听 deactivated
            // 组件利用事件总线 $bus 传事件给事件总线 这样爷爷组件能访问到孙子组件的事件
            this.$bus.$emit('itemImageLoad')
        },
        itemClick() {
            // 点击跳转页面
            this.$router.push('/detail/'+ this.goodsItem.iid)
        }
    },
    computed: {
        showImage() {
            // 判断数据来源。如果是推荐模块——前者；如果是主页——后者
            return this.goodsItem.image || this.goodsItem.show.img 
        }
    }
}
</script>
<style scoped>
.goods-item {
    padding-bottom:40px ;
    position: relative;
    width: 48%;
}
.goods-item img {
    width: 100%;
    border-radius: 5px;
}
.title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.price {
    margin-left: 10px;
    font-size: 14px;
    color: deeppink;
}
.collect {
    margin-left: 60px;
    font-size: 14px;
}
.collect::before {
    content: '';
    display: inline-block;
    margin-top: 8px;
    width: 16px;
    height: 16px;
    background: url('../../../assets/img/common/collect.jpg') no-repeat;
    background-size: 16px;
    
}
</style>