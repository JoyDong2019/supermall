import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import toast from './components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload';
Vue.use(Vant);
// 安装插件
Vue.use(toast);
// 使用图片懒加载
Vue.use(VueLazyLoad, {
    // loading时 显示的图
    loading: require('./assets/img/common/placeholder.png')
});
// 解决移动端300ms点击延迟——3步：npm install fastclick、导入、下面的语句
FastClick.attach(document.body)
Vue.config.productionTip = false
    // 创建事件总线  vue实例可以完成此任务  给原型加一个属性
Vue.prototype.$bus = new Vue()
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')