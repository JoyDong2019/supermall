<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props: {
        probeType:{
            type:Number,
            default(){
                return 0
            }
        },
        pullUpLoad:{
            type:Boolean,
            default() {
                return false
            }

        }
    },  
    data () {
        return {
            bscroll:null
        }
    },
    mounted () {
        this.bscroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            // div等元素也可以进行点击
            click:true,
            pullUpLoad:this.pullUpLoad
        })
        // 监听滚动位置
        if(this.probeType ===2 || this.probeType ===3) {
        this.bscroll.on('scroll',(position)=> {
            // console.log(position);
            this.$emit('scroll',position)
        })
        } 
        // 监听上拉事件
        if(this.pullUpLoad) {
            this.bscroll.on('pullingUp',()=> {
            this.$emit('pullingUp')
            // console.log('加载更多');
        })}
        
       
    },
    methods: {
        scrollTo(x,y,time=500) {
            this.bscroll && this.bscroll.scrollTo(x,y,time)
        },
        // 结束上拉事件
        finishPullUp() {
            this.bscroll && this.bscroll.finishPullUp()
        },
        refresh() {
            this.bscroll && this.bscroll.refresh()
        },
        getScrollY() {
            return this.bscroll ? this.bscroll.y : 0
        }
    }
}
</script>
<style scoped>

</style>