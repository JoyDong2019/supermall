<template>
    <div class="detailShop">
        <div class="shop-title">
            <span class="logo">
                <img :src="shop.logo" alt="">
            </span>
            <span class="name">{{shop.name}}</span>
        </div>
        <div class="shop-count">
            <div class="commodity-all">
                <div class="sell-total">
                    <div class="sell-num">{{shop.sells}}</div>
                    <div>总销量</div>
                </div>
                <div class="allcommmodity">
                    <div class="goods-count">{{shop.goodsCount}}</div>
                    <div>全部宝贝</div>
                </div>
            </div>
            <div class="shop-des">
                <div v-for="(item,index) in shop.score" :key="index" class="shop-des-item">
                    <span class="judge-name">{{item.name}}</span><span class="score" :class="{scoreishigh:item.isBetter}">{{item.score}}</span>
                    <span v-if="item.isBetter" class="isbetter" :class="{isHigh:item.isBetter}" >高</span>
                    <span v-else class="isbetter" :class="{isLow:!item.isBetter}">低</span>
                </div>    
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'detailShopInfo',
    props: {
        shop:{
            type:Object,
            default () {
                return {}
            }
        }

    }
}
</script>
<style scoped>
.detailShop {
    border-bottom: #efefef 2px solid;
    padding-bottom: 20px;
    color: #333;
}
.shop-title {
    height: 90px;
    padding: 10px 10px;
}
.shop-title .logo {
    float: left;
    width: 58px;
    height: 58px;
    border-radius: 29px;
    border: 1px solid #ccc;
    overflow: hidden;
}
.shop-count {
    height: 80px;
}
.shop-title .logo img {
    width: 100%;
    height: 100%;
    /* vertical-align: middle; */
}
.name {
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 18px;
}
.shop-count {
    display: flex;
    justify-content: space-evenly;
}
.commodity-all {
    display: flex;
    justify-content: space-evenly;
    align-self: center;
    text-align: center;
    
}
.sell-total,
.allcommmodity {
    font-size: 14px;
    margin-right: 15px;
}
.allcommmodity {
    padding-right: 15px;
    border-right: solid 1px #ccc;
}
.sell-num,
.goods-count {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
}
.shop-des {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
}
.shop-des-item {
    display: flex;
}

.judge-name {
    margin-left: -30px;
}
.score {
    width: 18px;
    height: 18px;
    margin-left: 15px;
    color: green;
}
.isbetter {
    position: absolute;
    right: 10px;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    color: #fff;

}
.scoreishigh {
    color: red;
}
.isHigh {
   
    background-color: red;
}
.isLow {
    background-color: green;
}
</style>