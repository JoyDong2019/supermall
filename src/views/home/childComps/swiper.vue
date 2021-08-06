<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banners" :key="index"> 
            <a :href="item.link">
                <!-- 监听图片加载完成事件。用以计算tab-control距离顶部的的距离 否则在mounted中计算的是有误（不包含图片）的数据 -->
                <img :src="item.image" alt="" @load="loadImage">
            </a>
        </van-swipe-item>
    </van-swipe>

</template>
<script>
export default {
    name:'swiper',
    props: {
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
   
    data () {
        return {
            isLoad : false      
        }
    },
    methods: {
        // 有四张图片，会产生四次事件。但我们希望有一次事件发送到外面就行。外面就可以依据此计算高度了
        // 所以加一个判断值
        loadImage() {
            
            if(!this.isLoad) {
                this.$emit('swiperImageLoad')
                // 置否 下次有这个事件，由于已经置否 不能再向外发送事件
                this.isLoad = true
            }
        }
    }

}
</script>
<style scoped>

  .my-swipe .van-swipe-item {
    /* color: #fff; */
    /* font-size: 20px; */
    /* line-height: 150px; */
    /* text-align: center; */
    background-color:#fff;
  }
    .van-swipe {
        width: 100%;
        height: 195px;
    }
    .van-swipe img {
        width: 100%;
    }
</style>