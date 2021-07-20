<template>
    <div class="comment-info" v-if="Object.keys(commentInfo).length!==0">
        <div class="info-header">
            <div class="header-title">用户评价</div>
            <div class="header-more">更多
                <i class="arrow-right">></i>
            </div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.created | showDate}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
            <div class="info-imgs">
                <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
                
            </div>
        </div>
    </div>
</template>
<script>
import {formatDate} from 'common/utils.js'
export default {
    name:'detailCommentInfo',
    props: {
        commentInfo:{
            type:Object,
            default() {
                return {}
            }
        }
    },
    filters: {
        showDate(value) {
            // 1 将时间戳转换成Date对象
            // Date里需要传毫秒
            const date = new Date(value * 1000)
            // 2 将date进行格式化
            return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        }
    }
}
</script>
<style scoped>
.comment-info {
    /* 清除浮动 */
    overflow: hidden;
}
.info-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
}
.header-title {
    font-weight: 700;
}
.header-more {
    color: cadetblue;
    font-weight: 700;
}
.arrow-right {
    /* display: inline-block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid cadetblue;
    border-bottom: 10px solid transparent; */
    font-size: 14px;
}
.info-user {
    padding: 20px;
}
.info-user img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
}
.info-user span {
    font-size: 14px;
    font-weight: 600;
}
.info-detail {
    padding-left: 20px;
}
.info-other {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-size: 13px;
    color: #999;
}
.info-imgs img {
    margin-top: 8px;
    margin-left: 5px;
    width: 60px;
    height: 60px;
}
</style>