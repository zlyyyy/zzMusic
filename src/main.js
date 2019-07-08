// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { Vue } from "@/utils/icomponent";
import App from "./App";
import router from "./router";
import store from "./store/index";
import axios from "./utils/http";
import zzLoading from "@/components/zzLoading/zzLoading";

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.component(zzLoading.name, zzLoading);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to.meta.title;
  next();
});

// 注册全局自定义指令
// 点击其他空白区域隐藏dom元素
Vue.directive("clickoutside", {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
