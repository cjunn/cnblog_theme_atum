// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueBus from 'vue-bus';
import './assets/icon/iconfont.css'
import "./assets/css/reset.css"


import hljs from './assets/lib/highlight/highlight.index'
import BlogInfoSet from "./utils/BlogInfoSet";
import blogUtils from "./utils/BlogUtils";
import blogKit from "./utils/BlogKit";
import blogShade from "./utils/BlogShade";
BlogInfoSet().then(()=>{
  Vue.config.productionTip = false
  Vue.use(VueBus);
  Vue.prototype.VUE_CTX = process.env.VUE_CTX;
  Vue.directive('highlight', function (el) {
    let pres = el.querySelectorAll('pre');
    pres.forEach((pre) => {
      blogUtils.initPreCodeCopyBtn(pre);
    })
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block, index) => {
      setTimeout(() => {
        if (!block.highInit) {
          block.highInit = true;
          hljs.highlightBlock(block);
        }
      }, index * 250);
    })
  })


  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    beforeCreate: function () {
      blogKit.initBaiduCount();
      router.beforeEach((to, from, next) => {
        blogKit.pushBaiduCount(to.fullPath);
        next();
      });
    },
    mounted: function () {
      setTimeout(() => {
        blogShade.close();
      }, 1000);
    }
  })
});
