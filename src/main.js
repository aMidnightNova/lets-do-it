import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import './plugins/gravatar';
import App from './App.vue';
import router from './router';
import store from './store';
Vue.config.productionTip = false;

import axios from 'axios';
Object.defineProperty(Vue.prototype, '$axios', {value: axios});

window.vm = new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
