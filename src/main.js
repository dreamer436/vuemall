import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {request} from './network/request'
import store from './store';

import FastClick from 'fastclick'
import VueLazyload  from 'vue-lazyload';
//导入toast插件
import toast from 'components/common/toast';

Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

// 创建事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300毫秒延迟问题
FastClick.attach(document.body)

// 使用图片懒加载的插件 loading图片加载时显示的图片
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
