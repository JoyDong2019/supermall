<template>
    <div class="nav-bar">
        <nav-bar>
            <template v-slot:left>
                <div class="backImage" @click="backEvent">
                    <img src="~assets/img/common/back.svg" alt="">
                </div>
            </template>

            <template v-slot:center>
                <div class="item-center">
                    <!-- html中获取data中元素不需要通过this来获取 -->
                    <div v-for="(item,index) in titles" :key="index" 
            
                    :class="{isActive:currentIndex === index}"
                    @click="selectItem(index)"
                    >{{item}} </div>

                </div>
            </template>

        </nav-bar>

    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name:'detailNavBar',
    data () {
        return {
            titles:['商品','参数','评论', '推荐'],
            currentIndex:0
        }
    },
    components: {
        NavBar
    },
    methods: {
        backEvent() {
            this.$router.go(-1)
        },
        selectItem(index) {
            this.currentIndex = index
            // 发送给父组件 
            this.$emit('tabClick',index)
        }
    }
}
        
</script>
<style scoped>
.backImage {
    margin-top: 5px;
    padding-left: 8px;
}
.item-center {
    display: flex;
    justify-content: space-evenly;
    font-size: 14px;

}
.isActive {
    color: var(--color-high-text);
}

</style>