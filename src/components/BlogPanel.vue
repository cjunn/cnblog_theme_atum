<template>
  <div id="blog_panel">
    <blog-full-page></blog-full-page>
    <blog-head class="blog-head-oub-wrap"></blog-head>
    <div class="blog-head-oub-body">
      <blog-aside></blog-aside>
      <div class="loading-bar">
        <div class="preloaderbar show active" :class="{'preloaderbarShow':isShowLoadingBar}">
          <span class="bar"></span>
        </div>
      </div>
      <div class="body-wrap none-base-scroll"
           ref="panel"
           @scroll="panelScrollEvent"
           :class="{'stop-scroll':isShowLoading}"
           @transitionEvent="transitionEvent"
      >
        <div id="panel_top_target"></div>
        <div class="loading-screen-lump" :class="{'loading-screen-lump-show':isShowLoading}">
          <div class="loading-screen-wrap">
            <div class="loading-screen-in">
              <div class="k-ball-holder3">
                <div class="k-ball7a"></div>
                <div class="k-ball7b"></div>
                <div class="k-ball7c"></div>
                <div class="k-ball7d"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="route-view-screen" :class="{'route-view-screen-hide':isShowLoading}">
          <router-view class="router-view-warp"></router-view>
          <blog-bottom class="router-bottom-wrap"></blog-bottom>
        </div>
        <div id="panel_bottom_target"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogHead from "./head/BlogHead";
    import BlogAside from "./aside/BlogAside";
    import BlogBottom from "./bottom/BlogBottom";
    import BlogFullPage from "./full/BlogFullPage";

    export default {
        name: "BlogPanel",
        components: {BlogFullPage, BlogBottom, BlogAside, BlogHead},
        mounted: function () {
            let callback = (e) => {
                if (e.propertyName == "opacity") {
                    this.$refs.panel.scrollTop = 0;
                }
            };
            this.$refs.panel.addEventListener('transitionend', callback);
            this.$refs.panel.addEventListener('webkitTransitionEnd', callback);

        },
        created: function () {
            this.$bus.on("panelToTop", () => {
                document.getElementById("panel_top_target").scrollIntoView({behavior: "smooth"});
            });
            this.$bus.on("panelToBottom", () => {
                document.getElementById("panel_bottom_target").scrollIntoView({behavior: "smooth"});
            });
            this.$bus.on("openLoadingBar", (param) => {
                this.isShowLoadingBar = true;
            });
            this.$bus.on("closeLoadingBar", (param) => {
                this.isShowLoadingBar = false;
            });
            this.$bus.on('beforeRoute', (param) => {
                this.isShowLoading = true;
                setTimeout(() => {
                    param.next();
                }, 300);
            });
            this.$bus.on('afterRoute', (param) => {
            });
            this.$bus.on('dataedRoute', (params) => {
                /*关闭加载中*/
                this.isShowLoading = false;
            });
            this.$bus.on('anchorScroll', (anchor) => {
                /*初始化锚点*/
                let query = this.$route.query;
                if (query && query.anchor) {
                    let anchorDom = document.querySelector("#app [href='#" + anchor + "']");
                    anchorDom ? anchorDom.scrollIntoView({behavior: "auto"}) : '';
                    delete this.$route.query.anchor;
                }
            });
        },
        methods: {
            panelScrollEvent: function (e) {
                this.$bus.emit("panelScrollEven", e);
            },
            transitionEvent: function (e) {
            }
        },
        data: () => {
            return {
                isShowLoading: false,
                isShowLoadingBar: false,
                include: 'BlogWorksBody,BlogAuthorBody'
            }
        },
    }
</script>

<style lang="scss">
  #blog_panel {
    @include panelWidth();
    height: 100%;
    margin: 0 auto;
    opacity: 0.98;
    position: relative;
    overflow: hidden;

    .blog-head-oub-wrap {
      position: fixed;
      z-index: 0;
      @include panelWidth();
      top: 0;
    }

    .blog-head-oub-body {
      position: fixed;
      @include panelWidth();
      top: $headHeight;
      height: calc(100% - #{$headHeight});
      z-index: -1;
    }

    .stop-scroll {
      overflow-y: hidden !important;
    }

    .body-wrap {
      font-size: 0px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0px;
      background-color: #f9f9f9;
      display: inline-block;
      overflow-x: hidden;
      overflow-y: scroll;
      overflow-scrolling:touch;
      -webkit-overflow-scrolling:touch;
      @include panelLeft();

      .loading-screen-lump {
        font-size: 12px;
        position: fixed;
        z-index: 2;
        height: 85px;
        box-sizing: border-box;
        transform: translateY(-100%);
        transition: all .25s ease-in-out 0s;
        @include panelWidth();
        padding-right: calc(#{$asideWidth});
        @include switchHeadBar() {
          padding-right: 0px;
        }

        .loading-screen-wrap {
          margin: 8px;
          height: 65px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0px 1px 5px rgba(80, 80, 80, 0.2);
          text-align: center;

          .loading-screen-in {
            padding-top: 13px;
            width: 40px;
            height: 100%;
            display: inline-block;

            .k-ball7a {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #19A68C;
              animation-delay: -1.5s
            }

            .k-ball7b {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #F63D3A;
              animation-delay: -1s
            }

            .k-ball7c {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #FDA543;
              animation-delay: -0.5s
            }

            .k-ball7d {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #193B48
            }

            @keyframes k-loadingO {
              0%, 100% {
                transform: translate(0)
              }
              25% {
                transform: translate(160%)
              }
              50% {
                transform: translate(160%, 160%)
              }
              75% {
                transform: translate(0, 160%)
              }
            }
          }
        }

      }

      .loading-screen-lump-show {
        transform: translateY(0);
      }

      .route-view-screen {
        opacity: 1;
        transition: opacity .30s ease-in-out 0s;
        position: relative;
        min-height: 100%;

        .router-view-warp {
          font-size: 0px;
          padding-bottom: $bottomHeight;
        }

        .router-bottom-wrap {
          position: absolute;
          bottom: 0;
        }
      }

      .route-view-screen-hide {
        opacity: 0;
      }
    }


    .loading-bar {
      .preloaderbarShow {
        transform: translateY(0) !important;
      }

      //彩色横向进度条
      .preloaderbar {
        transition: all 0.2s ease 0s;
        transform: translateY(-100%);
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        margin-bottom: -4px;
      }

      .preloaderbar .bar {
        position: absolute;
        width: 100%;
        height: 0;
        text-indent: -9999px;
        background-color: #23b7e5
      }

      .preloaderbar .bar:before {
        position: absolute;
        right: 50%;
        left: 50%;
        height: 3px;
        background-color: inherit;
        content: ""
      }

      .preloaderbar.active {
        -webkit-animation: changebar 2.25s infinite 0.75s;
        -moz-animation: changebar 2.25s infinite 0.75s;
        animation: changebar 2.25s infinite 0.75s;
      }

      .preloaderbar.active .bar {
        -webkit-animation: changebar 2.25s infinite;
        -moz-animation: changebar 2.25s infinite;
        animation: changebar 2.25s infinite;
      }

      .preloaderbar.active .bar:before {
        -webkit-animation: movingbar 0.75s infinite;
        -moz-animation: movingbar 0.75s infinite;
        animation: movingbar 0.75s infinite
      }

      @-webkit-keyframes movingbar {
        0% {
          right: 50%;
          left: 50%
        }
        99.9% {
          right: 0;
          left: 0
        }
        100% {
          right: 50%;
          left: 50%
        }
      }
      @-moz-keyframes movingbar {
        0% {
          right: 50%;
          left: 50%
        }
        99.9% {
          right: 0;
          left: 0
        }
        100% {
          right: 50%;
          left: 50%
        }
      }
      @keyframes movingbar {
        0% {
          right: 50%;
          left: 50%
        }
        99.9% {
          right: 0;
          left: 0
        }
        100% {
          right: 50%;
          left: 50%
        }
      }
      @-webkit-keyframes changebar {
        0% {
          background-color: #8BC34A
        }
        33.3% {
          background-color: #8BC34A
        }
        33.33% {
          background-color: #FFCA28
        }
        66.6% {
          background-color: #FFCA28
        }
        66.66% {
          background-color: #F44336
        }
        99.9% {
          background-color: #F44336
        }
      }
      @-moz-keyframes changebar {
        0% {
          background-color: #8BC34A
        }
        33.3% {
          background-color: #8BC34A
        }
        33.33% {
          background-color: #FFCA28
        }
        66.6% {
          background-color: #FFCA28
        }
        66.66% {
          background-color: #F44336
        }
        99.9% {
          background-color: #F44336
        }
      }
      @keyframes changebar {
        0% {
          background-color: #8BC34A
        }
        33.3% {
          background-color: #8BC34A
        }
        33.33% {
          background-color: #FFCA28
        }
        66.6% {
          background-color: #FFCA28
        }
        66.66% {
          background-color: #F44336
        }
        99.9% {
          background-color: #F44336
        }
      }
    }


  }
</style>
