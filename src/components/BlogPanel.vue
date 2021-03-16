<template>
  <div id="blog_panel">
    <blog-full-page></blog-full-page>
    <blog-head-bar class="blog-head-bar"></blog-head-bar>
    <div class="main-panel">
      <panel-aside id="panel_aside" class="panel-aside" :class="{'blog-aside-show':asideIsShow,'blog-aside-hide':!asideIsShow}"></panel-aside>
      <div class="panel-aside-shape" :class="!asideIsShow?'panel-aside-shape-hide':''" @click="asideIsShow=false">sss</div>
      <loading-bar ref="loadingBar" class="loading-bar-clz"></loading-bar>
      <loading-body ref="loadingBody" class="loading-body-clz"></loading-body>
      <div class="route-body none-base-scroll" ref="routerView" @scroll="panelScrollEvent">
        <div id="panel_top_target"></div>
        <router-view  class="router-view-wrap" ref="routeViewWrap" :style="{'min-Height':this.routeMinHeight+'px'}"></router-view>
        <blog-bottom></blog-bottom>
        <div id="panel_bottom_target"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import BlogHeadBar from "./head/BlogHeadBar";
  import PanelAside from "./aside/PanelAside";
  import ArticlesBody from "./body/CategoryBody";
  import RouteBody from "./body/SubjectBody";
  import LoadingBody from "./common/LoadingBody";
  import LoadingBar from "./common/LoadingBar";
  import BlogBottom from "./bottom/BlogBottom";
  import BlogFullPage from "./full/BlogFullPage";

  export default {
    name: "BlogPanel",
    methods: {
      panelScrollEvent:function(e){
        this.$bus.emit("panelScrollEven", e);
      }
    },
    data: () => {
      return {
        loading: true,
        lastPageId:'',
        routeMinHeight:'',
        asideIsShow:false
      }
    },
    created: function () {
    },
    components: {
      BlogFullPage,
      BlogBottom, LoadingBar, LoadingBody, RouteBody, ArticlesBody, PanelAside, BlogHeadBar},
    beforeRouteUpdate: function (to, from, next) {
      this.$bus.emit("fullLoadingOpen", next);
    },
    mounted: function () {
      /*监控滑到顶部事件*/
      this.$bus.on("panelToTop", () => {
        document.getElementById("panel_top_target").scrollIntoView({behavior: "smooth"});
      });
      /*监控滑到底部事件*/
      this.$bus.on("panelToBottom", () => {
        document.getElementById("panel_bottom_target").scrollIntoView({behavior: "smooth"});
      });
      /*小屏切换顶部设置界面*/
      this.$bus.on("switchPanelAside",()=>{
        this.asideIsShow=!this.asideIsShow;
      });
      /*全屏加载开启*/
      this.$bus.on("fullLoadingOpen", (next) => {
        this.$nextTick(() => {
          this.$refs.loadingBody?this.$refs.loadingBody.openLoading(() => {
            next?next():'';
            this.$refs.routerView.scrollTo(0, 0);
          }):'';

        })
      });
      /*全屏加载关闭*/
      this.$bus.on("fullLoadingClose", () => {
        this.$nextTick(() => {
          this.$refs.loadingBody?this.$refs.loadingBody.closeLoading():'';
        })
      });
      /*条加载开启*/
      this.$bus.on("barLoadingOpen", () => {
        this.$nextTick(()=>{
          this.$refs.loadingBar?this.$refs.loadingBar.openLoadingBar():'';
        })
      });
      /*条加载关闭*/
      this.$bus.on("barLoadingClose", () => {
        this.$nextTick(()=>{
          this.$refs.loadingBar?this.$refs.loadingBar.closeLoadingBar():'';
        })
      });
      this.routeMinHeight=(this.$refs.routerView.clientHeight-40);
    }
  }
</script>

<style lang="scss">
  #blog_panel {
    display: inline-block;
    @include panelWidth();
    height: 100%;
    text-align: left;
    font-size: 0px;
    position: relative;
    box-shadow: 0 0 4px 3px rgba(0,0,0,.05);
    opacity: .98;
    .blog-head-bar {
      height: $headHeight;
      z-index: 10;
    }

    .main-panel {
      height: calc(100% - #{$headHeight});
      position: relative;
      left: 0;


      @include switchHeadBar(){
        .blog-aside-show {
          @include showAside();
        }
        .blog-aside-hide {
          @include hideAside();
        }
      }
      .panel-aside-shape{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
        background-color: rgba(0,0,0,.3);
        display: none;
        @include switchHeadBar(){
          display: inline-block;
        }
      }
      .panel-aside-shape-hide{
        display: none;
      }
      .panel-aside {
        position: absolute;
        left: 0;
        z-index: 4;
        transition: all 0.3s ease-out 0.1s;
        width: 230px;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        box-shadow: .8px .8px .8px rgba(0, 0, 0, .2);
        box-sizing: border-box;
      }


      .loading-bar-clz {
        width: 100%;
        position: absolute;
        vertical-align: top;
        z-index: 2;
        width: calc(100% - 230px);
        left: 230px;
        @include switchHeadBar(){
          width: 100%;
          left: 0;
        }
      }

      .loading-body-clz {
        transition: all .25s ease-in-out 0s;
        position: absolute;
        vertical-align: top;
        z-index: 2;
        width: calc(100% - 230px);
        left: 230px;
        @include switchHeadBar(){
          width: 100%;
          left: 0;
        }
      }

      .route-body {
        background-color: #F6F8F9;
        left: 230px;
        width: calc(100% - 230px);
        @include switchHeadBar(){
          left: 0px;
          width: 100%;
        }
        position: absolute;
        top: 0;

        overflow-y: scroll;
        display: inline-block;
        height: 100%;
        overflow-x: hidden;
        vertical-align: top;
        .router-view-wrap{
          min-height: calc(100% - 40px);
        }
      }
    }
  }
</style>
