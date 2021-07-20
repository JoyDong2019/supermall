<template>
  <div id="app">
    <tabbar class="tab-bar"  v-show="$route.name!=='detail'"></tabbar>
    <!-- 把detail排除在外 否则数据不刷新 -->
    <keep-alive exclude="Detail">
        <router-view/>
    </keep-alive>
  </div>
</template>
<script>

import tabbar from './components/content/tabbar'
export default {
  components: {
    tabbar
  }
}
</script>
<style lang="less">
@import "./assets/css/base.css";


</style>
