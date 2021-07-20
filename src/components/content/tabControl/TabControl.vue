<template>
    <div class="tab-control">
        <div class="tab-control-item" 
        v-for="(item,index) in titles" :key="index"
        :class="{active:isActiveIndex === index}"
        @click="itemClick(index)"
        >
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TabControl',
    props: {
        titles:{
            type:Array,
            default() {
                return []
            }
        }
    },
    data () {
        return {
            isActiveIndex:0
        }
    },
    methods: {
        itemClick(index) {
            this.isActiveIndex = index;
            // 子组件点击事件传给父组件
            this.$emit('tabClick',index)
        }
    }
}
</script>
<style scoped>
.tab-control {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
}
.tab-control-item {
    flex: 1;
}
.tab-control-item span {
    padding: 5px;
}
.active {
    color: var(--color-high-text);
}
.active span {
    border-bottom: 3px solid var(--color-tint);
}

</style>