<template>
  <div id="blog_body_aside">
    <div class="menu-head">
      <span class="article-menu-item" @click="clickItem='hot'"
            :class="{'menu-itm-bottom-bar':clickItem=='hot'}">
            <span class="icon iconfont fire"></span>
      </span>
      <span class="article-menu-item" @click="clickItem='comment'"
            :class="{'menu-itm-bottom-bar':clickItem=='comment'}">
            <span class="icon iconfont talk"></span>
      </span>
      <span class="article-menu-item" v-show="isNavicat" @click="clickItem='navicat'"
            :class="{'menu-itm-bottom-bar':clickItem=='navicat'}">
            <span class="icon iconfont menu"></span>
      </span>
      <span class="article-menu-item" v-show="!isNavicat" @click="clickItem='follower'"
            :class="{'menu-itm-bottom-bar':clickItem=='follower'}">
            <span class="icon iconfont groupctrl"></span>
      </span>
    </div>
    <blog-hot-page v-show="clickItem=='hot'"></blog-hot-page>
    <blog-comment-page v-show="clickItem=='comment'"></blog-comment-page>
    <blog-navicat-page v-show="clickItem=='navicat'"></blog-navicat-page>
    <blog-info-page v-show="clickItem!='navicat'&&clickItem!='follower'"></blog-info-page>
    <blog-cloud-page v-show="clickItem!='navicat'&&clickItem!='follower'"></blog-cloud-page>
    <blog-followers v-show="clickItem=='follower'"></blog-followers>
  </div>
</template>

<script>
    import BlogHotPage from "./aside/BlogHotPage";
    import BlogInfoPage from "./aside/BlogInfoPage";
    import BlogCloudPage from "./aside/BlogCloudPage";
    import BlogCommentPage from "./aside/BlogCommentPage";
    import BlogNavicatPage from "./aside/BlogNavicatPage";
    import BlogFollowers from "./aside/BlogFollowers";

    export default {
        name: "BlogWorksAside",
        components: {BlogNavicatPage, BlogCommentPage, BlogCloudPage, BlogInfoPage, BlogHotPage, BlogFollowers},
        data: () => {
            return {
                clickItem: 'hot',
                isNavicat: false,
            }
        },
        created: function () {
            /*文章开启*/
            this.$bus.on("articleInited", (dom) => {
                this.clickItem = 'navicat';
                this.isNavicat = true;
            });
            /*文章关闭*/
            this.$bus.on("articleDestroy", (dom) => {
                this.clickItem = 'hot';
                this.isNavicat = false;
            });
        }
    }
</script>

<style lang="scss">

  #blog_body_aside {
    display: inline-block;
    vertical-align: top;
    top: 0px;
    @include worksAsideLeft();
    @include deve4() {
      display: none;
    }
    @include switchHeadBar() {
      display: none;
    }
    width: 250px;
    overflow-x: hidden;
    font-size: 0;
    box-sizing: border-box;

    .menu-head {
      display: flex;
      border-bottom: 1px solid rgb(226, 232, 234);

      .menu-itm-bottom-bar {
        border-bottom: 1px solid rgb(35, 183, 229);
      }

      .article-menu-item {
        flex: 1;
        text-align: center;
        cursor: pointer;
        height: 100%;
        line-height: 40px;
        margin-top: 10px;
        box-sizing: border-box;

        span {
          font-size: 23px !important;
          color: rgb(152, 166, 173);
        }
      }
    }


  }
</style>
