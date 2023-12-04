import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
// 线上配置
// axios.defaults.baseURL = "http://files.aikuiba.cn:30002";
// 开发配置
axios.defaults.baseURL = "http://127.0.0.1:8080";
axios.interceptors.request.use((config) => {
  config.headers["FROMAPP"] = "20231201";
  return config;
});
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
new Vue({
  router,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
