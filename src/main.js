import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '../src/router/index'
// 引入全局样式
import './assets/css/global.css'
Vue.config.productionTip = false

// 5.0版本引入
// import * as echarts from 'echarts'
// 4.0版本引入
/*import echarts from 'echarts'
Vue.prototype.$echarts = echarts*/

import echarts from 'echarts'
Vue.prototype.$echarts = echarts


// 引入element组件 下面三行
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入icon
import iconfontSvg from "./components/iconfont.vue";
Vue.component("iconfont-svg",iconfontSvg)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
