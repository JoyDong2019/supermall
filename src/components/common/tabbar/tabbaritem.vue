<template>
    <div class="tabbaritem" @click="topage">
        <!-- 放在div中设置v-if v-bind等属性 不然slot会被替换 -->
        <!-- 如果点击后换图，需要这里放两个图 用v-if和v-else控制。变量为isActive -->
        <div v-if='isActive'> <slot name="item-icon-active" class="icon"></slot> </div>
       <div v-else> <slot name="item-icon" class="icon"></slot> </div>

        <div :style="activeStyle">  <slot name="item-text" class="text"></slot> </div>
    </div>
</template>
<script>
export default {
    props: {
        'path':String,
        'activeColor':{
            type:String,
            default:'red'
        }
    },
    data () {
        return {
            
           
        }
    },
    computed: {
        isActive() {
        // $route返回激活页面
                return this.$route.path.indexOf(this.path)!==-1
            
        },
        activeStyle() {
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods: {
        topage() {
            // 加catch消除错误
            this.$router.push(this.path).catch(()=>{})
        }
    }
}
</script>
<style lang="less" scoped>
    .tabbaritem {
        width: 100%;
        height: 60px;
        text-align: center;
        .text {
            font-size: 14px;
           
            font-weight: 700;
        }
        .icon {
            margin-top: 10px;
            width: 20px;
            height: 20px;
        }
    }
</style>