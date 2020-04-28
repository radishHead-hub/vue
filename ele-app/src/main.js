import Vue from 'vue';
import App from './App.vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import router from './router';
import store from './store';
import axios from 'axios';
import GoEasy from 'goeasy';

import { Indicator } from 'mint-ui';
import { Field } from 'mint-ui';
Vue.component(Field.name, Field);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.config.devtools = true
Vue.use(MintUI);

// axios.defaults.baseURL = 'https://ele-interface.herokuapp.com/';

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 加载动画
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error);
  }
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
