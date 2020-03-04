// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/icon/iconfont.css'
import './assets/css/reset.css'
import vueBus from 'vue-bus';
import BlogUtils from "./utils/BlogUtils";
import BlogShade from "./utils/BlogShade";
import hljs from './assets/lib/highlight/highlight.index'

Vue.use(vueBus);
Vue.prototype.VUE_CTX = process.env.VUE_CTX;
Vue.config.productionTip = false;

/*新增代码高亮及复制功能*/
Vue.directive('highlight', function (el) {
  let pres = el.querySelectorAll('pre');
  pres.forEach((pre) => {
    BlogUtils.initPreCodeCopyBtn(pre);
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
let vue = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  beforeCreate: function () {
    /*初始化百度统计*/
    BlogUtils.initBaiduCount();
    router.beforeEach((to, from, next) => {
      BlogUtils.pushBaiduCount(to.fullPath);
      this.$bus.emit('beforeRoute', {
        to: to,
        from: from,
        next: next,
      })
    });
    router.afterEach((to, from) => {
      this.$bus.emit('afterRoute', {
        to: to,
        from: from
      })
    })
  },
  mounted: function () {
    BlogShade.close();
  }
})

