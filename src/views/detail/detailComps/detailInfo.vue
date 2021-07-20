<template>
    <div class="detail-info">
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="key">{{detailInfo.detailImage[0].key}}</div>
        <div class="pic">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" 
            :key="index" :src="item" alt="" @load="loadImage">
        </div>
    </div>
</template>
<script>
export default {
    name:'detailInfo',
    props: {
        detailInfo:{
            type:Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            // 计算加载了图片个数
            count:0,
            imagesLength:0
        }
    },
    methods: {
        loadImage() {
            this.count++
            if(this.count === this.imagesLength) {
                // 这样只发送出去一次事件
                 this.$emit('loadImage')

            }
        }
    },
    created () {
        
        // console.log('父组件数据',this.detailInfo);
    },
    watch: {
        // 监听detailInfo属性的变化
        detailInfo() {
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>
<style scoped>
    .desc {
        padding: 10px;
        font-size: 14px;
        color: #555;
        line-height: 20px;
    }
    .key {
        padding: 15px;
        font-weight: 700;
    }
    .pic img{
        width: 100%;
    }
</style>