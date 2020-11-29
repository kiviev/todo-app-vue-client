import Vue from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";

import axios from 'axios';


Vue.config.productionTip = false;

const apiUrl = process.env.NODE_ENV == 'production' 
  ? 'http://dev.ofertaka.com/api/'
  : 'http://nextyres.test/api/';

const axiosInstance = axios.create({
  baseURL: apiUrl
});

Vue.prototype.$http = axiosInstance


new Vue({
  render: h => h(App)
}).$mount("#app");


