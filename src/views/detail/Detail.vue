<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" @tabClick="tabClick" ref="nav"/>
    <scroll class="inner-content" ref="scroll" :probe-type="3" @scroll="scrollEvent">
        <detail-swiper :banners="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-info :detail-info="detailInfo" @loadImage="loadImage"/>
        <detail-param-info :param-info="paramInfo" ref="param"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <div class="recom-title" ref="more">更多推荐</div>
        <goods-list :goods="recommends"/>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="toTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
</div>
    
</template>
<script>
import DetailNavBar from './detailComps/detailNavBar.vue'
import DetailSwiper from './detailComps/detailSwiper.vue'
import DetailBaseInfo from './detailComps/detailBaseInfo.vue'
import DetailShopInfo from './detailComps/detailShopInfo.vue'
import DetailInfo from './detailComps/detailInfo.vue'
import DetailParamInfo from './detailComps/detailParamInfo.vue'
import DetailCommentInfo from './detailComps/detailCommentInfo.vue'
import DetailBottomBar from './detailComps/detailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'


import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '../../network/detail'
import {debounce} from 'common/utils.js'
import {itemListenerMixin,toTopMixin } from 'common/mixin.js'

import {mapActions} from 'vuex'
export default {
    name:'Detail',
    data () {
         return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            itemOffsetY:[],
            getThemeTopY:null,
            currentIndex:0
        }
    },
    // mounted中的内容改为用混入引入————防止代码重复（home中也是）
    mixins: [itemListenerMixin,toTopMixin],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        
       
    },
    methods: {
        ...mapActions(['addCart']),

      loadImage() {
        //  刷新下scroll 使其准确的计算滚动高度
        this.$refs.scroll.refresh() 
        // 由于图片最后才能载入，放在created mounted $nextTick都不行，所以刚开better-scroll计算距离不正确，需要在图片加载结束后再进行载入距离顶部距离
        this.getThemeTopY()
       
      },
      tabClick(index) {
        //  距离为 负！
        this.$refs.scroll.scrollTo(0,-this.itemOffsetY[index],200)
        this.currentIndex = index
        
      },
      scrollEvent(position) {
        //   1 获取y值
        const positionY= -position.y
        // 2 判断位置
        let length = this.itemOffsetY.length
        for(let i =0;i<length-1;i++) {
            if(this.currentIndex!== i && (positionY >= this.itemOffsetY[i] && positionY <this.itemOffsetY[i+1])) {
                // 第一个判断： 当前的currentIndex变化时 才进行判断赋值————避免一滚动就赋值——冗余
                this.currentIndex = i;
                this.$refs.nav.currentIndex = this.currentIndex
            }
        }
        // 3 to-top按钮监听。到位置时 显示
        // 其实这里也可以放mixin里  但是我觉得没必要~ （外面创建一个函数，传position给它，然后这里调用这个函数）
        this.isShowBackTop = (-position.y) > 736
      },
        
       addToCart() {
        //    1 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = parseFloat(this.goods.lowPrice)
        product.iid = this.iid
        // 2 将商品添加到购物车里 Actions可以返回一个Promise
        // 传给vuex的store里。
        // this.$store.dispatch('addCart',product).then(res=> console.log(res))
        this.addCart(product).then(
            // res=>console.log(res)
            // 调用toast里的方法
           res=> this.$toast.show(res,2000)
        )
       } 
    },
    created () {
        // 1 拿到通过query字符串传递过来的值
        this.iid = this.$route.params.iid
       
        // 2 根据iid 请求详细数据
        getDetail(this.iid).then(res => {
            console.log('详情页',res);
            const data = res.result
            this.topImages = data.itemInfo.topImages
            // 3 获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // 4  获取店铺信息
            this.shop = new Shop(data.shopInfo)
            // 5 获取 店铺详情图片等
            this.detailInfo = data.detailInfo
            // 6 获取商品尺码等信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            // 7 获取评论信息
            if(data.rate.cRate !==0) {
                this.commentInfo = data.rate.list[0]
            }
        })
        
        // 3 请求推荐数据
        getRecommend().then(res => {
            // console.log('推荐数据',res);
            this.recommends = res.data.list
        })

        // 4 给getThemeTopY赋值
        this.getThemeTopY = debounce(()=> {
            // 每次先清空数组
             this.itemOffsetY = []
             this.itemOffsetY.push(0)
            //  计算距离要加上 顶部导航栏的高度 。由于距离是负数 所以应该减号
             this.itemOffsetY.push(this.$refs.param.$el.offsetTop - 44)
             this.itemOffsetY.push(this.$refs.comment.$el.offsetTop - 44)
             this.itemOffsetY.push(this.$refs.more.offsetTop - 44)
             this.itemOffsetY.push(Number.MAX_VALUE)  //加入一个人很大的值 让滚动事件的最后一个值可以和它结合 不至于多写一个判断条件
            //  console.log(this.itemOffsetY); 
        })
    },
    mounted () {
        // 1 监听goodslistitem中图片加载传出的事件总线事件
        // let newRefresh = debounce(this.$refs.scroll.refresh,100)
        // this.itemImgListener = ()=> {
        //     newRefresh()
        // }
        // this.$bus.$on('itemImageLoad',this.itemImgListener)
        
        
    },
    
    destroyed () {
        // 由于detail组件不在keep-alive中，所以不能写在deactived
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
}
</script>
<style scoped>
#detail {
    /* 不让显示底部导航栏——设置定位 */
    position: relative;
    background-color: #fff;
    z-index: 99;
    height: 100vh;

}
.inner-content {
    /* 必须要给滚动区域高度 */
    height: calc(100% - 44px -  50px);
    overflow: hidden;
}
.detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 99;
}
.recom-title {
    margin: 10px auto;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: cadetblue;
    color: #fff;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 700;
    border-radius:20px ;
}
.goods {
    margin-top: 20px;
    width: 100%;
}
</style>