<template>
    <div id="home">
        <nav-bar class="home-nav">    
                <template v-slot:center>
                     <div class="center">购物街</div>
                </template>         
        </nav-bar>
        <!-- 在滑到指定位置显示 -->
        <tab-control :titles='titles' class="tab-control2" @tabClick="tabClick" ref="tabControl2" v-show="tabControlShow"/>

    <!-- 加一个ref属性 方便back-top查找到调用里面的一些属性 -->
        <scroll class="content" ref="scroll" 
        :probe-type="3" @scroll="contentScroll"
        :pull-up-load="true" @pullingUp="loadMore">
            <swiper  class="swiper" :banners='banners' @swiperImageLoad='swiperImageLoad'/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles='titles' class="tab-control" @tabClick="tabClick" ref="tabControl1"/>
            <good-list :goods="showGoods"/>
            
        </scroll>
        <!-- 不能放在scroll里 因为他要控制其滚动 -->
        <!-- .native修饰符 ————组件本身不能添加事件。加上它就可以使用原生事件 -->
        <back-top v-show="isShowBackTop" @click.native="toTop"/>
        
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop.vue'


import swiper from './childComps/swiper';
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home.js';
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'


export default {
    name:'Home',
    components: {
        NavBar,
        TabControl,
        GoodList,
        Scroll,
        BackTop,

        swiper,
        RecommendView,
        FeatureView,
        
       
        
        
       
    },
    data () {
        return {
            banners:[],
            recommends:[],
            titles:['流行','新款','精选'],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},

            },
            currentType:'pop',
            isShowBackTop:false,
            // tab-control 距离顶部距离
            tabOffsetTop:0,
            tabControlShow:false,
            // 离开页面时的距离顶部距离
            saveY:0,

        }
    },
    created () {
        // 1 请求多个数据——轮播图 推荐部分信息
        this.getHomeMultidata()
            
        // 2 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
        

       
    },
    mounted () {
        // 1 图片刷新监听
        // const refresh = debounce(this.$refs.scroll.refresh,50)
        // 监听item中图片加载完成:每次加载完成图片就刷新一次页面：以保证betterscroll正确设置他自己的scrollHeight 实现正确的滑动
    //    this.itemImgListener = () => { refresh() }
    //    this.$bus.$on('itemImageLoad',this.itemImgListener)
            // console.log('----refresh----');
            // 但这样会导致浏览器频繁请求数据——需要加防抖
            // this.$refs.scroll && this.$refs.scroll.refresh()
            
      
        // 2 tabcontrol吸顶效果完成————监听距离顶部高度
        // 所有组件都有一个属性$el：用于获取组件中元素

    },
    // mounted中的方法 用到的data参数改为用 混入 引入
    mixins: [itemListenerMixin],
    computed: {
      showGoods() {
          return this.goods[this.currentType].list
      }  
    },
    activated () {
        // 进入时 回到原始位置
        // 最好刷新下界面
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated () {
        // 1  离开时 保存下页面距离顶部距离
        this.saveY = this.$refs.scroll.getScrollY()
        // 2 取消全局事件的监听.对事件其中某一函数取消监听
        this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
        /**
         * 事件监听相关方法
         */
        
        tabClick(index) {
            // console.log(index);
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break;
                case 1:
                    this.currentType = 'new'
                    break;
                case 2:
                    this.currentType = "sell"
                    break;
                default:
                    break;
            }
            // 使得两个tabcontrol点击同步
            // 拿到子组件中的被点击的data属性isActiveIndex
            this.$refs.tabControl1.isActiveIndex = index
            this.$refs.tabControl2.isActiveIndex = index
        },
        toTop() {
            // console.log('1111');
            // console.log(this.$refs.scroll.bscroll);
            
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position) {
            // console.log(position);
            this.isShowBackTop = (-position.y) > 600
            // 2 监听是否到可以显示第二个tabcontrol的位置
            this.tabControlShow = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        
        },
        swiperImageLoad() {
            // console.log( this.$refs.tabControl1.$el.offsetTop);
            this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
            // console.log(res)
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
        })
        },
        getHomeGoods(type) {
            // 每次调用就加载下一页的数据
            let page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res=> {
                console.log(res);
                //  array.push(...list)  list=[1,2,3]  ...解构可以把一个数组中的元素一次移入数组中
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1
                  // 调用 结束上拉事件.不然上拉事件只会触发一次
                this.$refs.scroll.finishPullUp()
            })
          

        }
    }
}
</script>
<style scoped>
#home {
    height: 100vh;
    /* padding-top: 44px; */
}
.home-nav {
    /* position: fixed;
    top: 0;
    left: 0; */
    background-color: var(--color-tint);
    color: #fff;
    z-index: 999;
   
}

.center {
    color: #fff;
    font-weight: 700;
    
}
.tab-control2 {
    position: relative;
    left: 0;
    top: 0;
    z-index: 999;
}
/* .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 60px;
    left: 0;
    right: 0;
} */
.content {
    /* calc() 里内容两边都要加个空格 */
    height: calc( 100% - 148px );
    /* margin-top: 44px; */
    overflow: hidden;
} 

</style>