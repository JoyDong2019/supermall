<template>
    <div class="tabbar">
        <tabbaritem path='/home' activeColor='deeppink'>
        <!-- 组件里用相对地址别名 需要加~ -->
            <img src='~assets/img/tabbar/home.svg' alt="" class="icon" slot="item-icon">
            <img src='~assets/img/tabbar/home_active.svg' alt="" class="icon" slot="item-icon-active">        
            <div class="text" slot="item-text">首页</div>
        </tabbaritem>
        <tabbaritem path='/category' activeColor='deeppink'>
            <img src='~assets/img/tabbar/category.svg' alt="" class="icon" slot="item-icon">
            <img src='~assets/img/tabbar/category_active.svg' alt="" class="icon" slot="item-icon-active">

            <div class="text" slot="item-text">分类</div>
        </tabbaritem>
        <tabbaritem path='/shopcart' activeColor='deeppink'>
            <img src='~assets/img/tabbar/shopcart.svg' alt="" class="icon" slot="item-icon">
            <img src='~assets/img/tabbar/shopcart_active.svg' alt="" class="icon" slot="item-icon-active">

            <div class="text" slot="item-text">购物车</div>
        </tabbaritem>
        <tabbaritem path='/profile' activeColor='deeppink'>
            <img src='~assets/img/tabbar/profile.svg' alt="" class="icon" slot="item-icon">
            <img src='~assets/img/tabbar/profile_active.svg' alt="" class="icon" slot="item-icon-active">

            <div class="text" slot="item-text">我的</div>
        </tabbaritem>

    </div>
</template>
<style lang="less">
    .tabbar {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 60px;
        position: fixed;
        bottom: 0;
        left: 0;
        
        background-color: #efefef;
    }
</style>
<script>
import tabbaritem from '../common/tabbar/tabbaritem'

export default {
    components: {
        tabbaritem,
        
    }
}
</script>