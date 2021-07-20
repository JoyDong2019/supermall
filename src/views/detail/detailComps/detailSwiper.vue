<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banners" :key="index"> 
            
                <!-- 监听图片加载完成事件。用以计算tab-control距离顶部的的距离 否则在mounted中计算的是有误（不包含图片）的数据 -->
                <img :src="item" alt="" >
            
        </van-swipe-item>
        
    </van-swipe>

</template>
<script>
export default {
    name:'detailSwiper',
    props: {
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
   
   

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
        height: 400px;
    }
    .van-swipe img {
        width: 100%;
    }
</style>