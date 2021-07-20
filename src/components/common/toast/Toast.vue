<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>
<script>
export default {
    name:'Toast',
    data () {
        return {
            message:'',
            isShow:false
        }
    },
    methods: {
        show(message='已完成',duration=1500) {
            this.message = message
            this.isShow = true
            // 过一段时间消失
            setTimeout(() => {
            this.message = '';
            this.isShow = false
            }, duration);
        }
    }
}
</script>
<style scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, .65);
    border-radius: 10px;
    z-index: 999;
}
</style>