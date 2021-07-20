<template>
<!-- 判断有没有数据 有就展示 -->
    <div v-if="Object.keys(goods).length !==0" class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="(item,index) in goods.services.length" :key="index">
                <img :src="goods.services[index].icon" alt="">
                <span>{{goods.services[index].name}}</span>
            </span>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'detailBaseInfo',
    props: {
        goods:{
            type:Object,
            default() {
                return {}
            }
        }
    }
}
</script>
<style scoped>
.info-title {
    padding: 10px 5px;
    font-size: 16px;
    color: #333;

}
.info-price {
    margin-left: 10px;
}
.info-price .n-price {
    color: red;
}
.info-price .o-price {
    display: inline-block;
    margin-left: 10px;
    text-decoration: line-through;
}
.discount {
    display: inline-block;
    width: 54px;
    height: 20px;
    margin-left: 10px;
    border-radius: 20px;
    line-height: 20px;
    background-color: red;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-align: center;
}
.info-other {
    padding: 10px 5px;
    font-size: 14px;
    
}
.info-other span {
    float: right;
    
    margin-right: 10px;
    margin-bottom: 10px;
}
.info-service {
    /* border-top: solid #ccc 1px;
    border-bottom: solid #ccc 1px; */
    padding: 5px;
    width: 100%;
    height: 30px;
    line-height: 25px;
    display: flex;
    justify-content: space-around;
    background-color: #efefef;
}
.info-service img {
    width: 14px;
    height: 14px;
    margin-right:3px;
    
    /* 给图片加这个属性 */
    vertical-align: middle;

}
.info-service span {
    font-size: 12px;
    font-weight: 700;
}
</style>