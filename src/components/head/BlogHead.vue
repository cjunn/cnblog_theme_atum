<template>
  <div id="blog_head">
    <div ref="blogHead" class="blog-head-wrap"
         :class="{'headSetPop':isPop,'headSetNotPop':!isPop,'blog-hidden':isHidden}">
      <blog-name></blog-name>
      <blog-search></blog-search>
      <blog-music class="blog-music"></blog-music>
      <div class="blog-head-set-wrap" @click="setEvent">
        <span class="icon iconfont shezhi"></span>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogConst from "../../const/BlogConst";
    import BlogName from "./BlogName";
    import BlogSearch from "./BlogSearch";
    import BlogMusic from "./BlogMusic";

    export default {
        name: "BlogHead",
        components: {BlogMusic, BlogSearch, BlogName},
        data: () => {
            return {
                isPop: false,
                isHidden: true,
                "blogName": BlogConst.blogName + "博客"
            }
        },
        methods: {
            setEvent: function () {
                this.isPop = !this.isPop;
                !this.isPop ? this.isHidden = true : '';
            }
        },
        mounted: function () {
            setTimeout(() => {
                let animationendEvent = (e) => {
                    if (e.srcElement.className.indexOf("headSetNotPop") > 0) {
                        this.isHidden = true;
                    } else {
                        this.isHidden = false;
                    }
                }
                this.$refs.blogHead.addEventListener('transitionend', animationendEvent);
                this.$refs.blogHead.addEventListener('webkitTransitionEnd', animationendEvent);
            }, 2000);
        }
    }
</script>

<style lang="scss">

  #blog_head {

    .headSetPop {
      @include switchHeadBar {
        height: 239px !important;
        box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, .3) !important;
      }
    }

    .headSetNotPop {
      @include switchHeadBar {
        height: $headHeight !important;
      }
    }

    .blog-hidden {
      @include switchHeadBar {
        overflow: hidden;
      }
    }

    .blog-head-wrap {
      transition: all 0.2s ease-in-out 0s;
      font-size: 0px;
      display: inline-block;
      width: 100%;
      height: $headHeight;
      background-color: $headBackColor;
      line-height: $headHeight;

      @include switchHeadBar {
        height: auto;
        /*overflow: hidden;*/
        position: absolute !important;
      }

      .blog-music {
        vertical-align: top;
        float: right;
      }

      .blog-head-set-wrap:hover {
        color: #e9eaec;
        background-color: #32374a;
      }

      .blog-head-set-wrap {
        vertical-align: top;
        position: absolute;
        right: 0;
        width: 50px;
        top: 0;
        padding-left: 4px;
        height: $headHeight;
        text-align: center;
        color: #a6a8b1;
        box-sizing: border-box;
        cursor: pointer;
        display: none;
        @include switchHeadBar {
          display: inline-block;
        }
      }
    }
  }
</style>
