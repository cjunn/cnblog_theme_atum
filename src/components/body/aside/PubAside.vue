<template>
  <div id="pub_aside">
    <div class="pub-head">
      <span class="article-menu-item" :class="selectItem==1?'article-menu-bottom':''" @click="selectItem=1">
        <span class="icon iconfont fire"></span>
      </span>
      <span class="article-menu-item" :class="selectItem==2?'article-menu-bottom':''" @click="selectItem=2">
        <span class="icon iconfont talk"></span>
      </span>
      <span class="article-menu-item" :class="selectItem==3?'article-menu-bottom':''" @click="selectItem=3">
        <span class="icon iconfont menu"></span>
      </span>
    </div>
    <div class="pub-body">
      <div class="pub-body-view-posts" v-show="selectItem==1">
        <div>
          <div class="pub-body-title">热门文章</div>
          <div>
            <div v-for="(item,id) in viewPosts" class="pub-item" @click="clickOpenArticle(item.url)">
              <div class="pub-face panel-right-img-style"
                   :style="rightImg(id)"
              ></div>
              <div class="pub-item-wrap">
                <div class="item-title double-ellipsis" :title="item.title">{{item.title}}</div>
                <div class="item-see">
                  <span class="icon iconfont see"></span>
                  <span>{{item.num}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside-info-page></aside-info-page>
        <blog-cloud-page></blog-cloud-page>

      </div>
      <div class="pub-body-comment" v-show="selectItem==2">
        <div>
          <div class="pub-body-title">最新评论</div>
          <div>
            <div v-for="(item,id) in catListComment" class="pub-item" @click="clickOpenArticle(item.url)">
              <img class="pub-face panel-right-img-style" :src="item.img">
              <div class="pub-item-wrap">
                <div class="item-title sing-ellipsis" :title="item.title">{{item.title}}</div>
                <div class="item-body double-ellipsis" :title="item.body" v-html="item.body">{{item.body}}</div>
                <div class="item-committer" :title="item.committer">-- {{item.committer}}</div>
              </div>
            </div>
          </div>
          <aside-info-page></aside-info-page>
          <blog-cloud-page></blog-cloud-page>
        </div>
      </div>
      <div class="pub-body-menulist" v-show="selectItem==3">
        <blog-cloud-ad></blog-cloud-ad>
        <blog-navicat-page></blog-navicat-page>
      </div>
    </div>
  </div>
</template>

<script>
  import emoji from "../../../utils/EmojiUtils";
  import blogApi from "../../../utils/BlogApi";
  import blogKit from "../../../utils/BlogKit";
  import AsideInfoPage from "./AsideInfoPage";
  import BlogCloudPage from "./BlogCloudPage";
  import BlogNavicatPage from "./BlogNavicatPage";
  import BlogCloudAd from "./BlogCloudAd";
  import BlogContext from "../../../context/BlogContext";

  export default {
    components: {BlogCloudAd, BlogNavicatPage, BlogCloudPage, AsideInfoPage},
    name: "BodyAside",
    data: () => {
      return {
        selectItem: 1,
        viewPosts: [],
        catListComment: [],
      }
    },
    methods: {
      rightImg:function(id){
        return {
          background: "url("+BlogContext.panelRightImgPic[id]+") no-repeat"
        }
      },
      clickOpenArticle:function(url){
        if(this.$router.currentRoute.path!=url){
            this.$router.push(url);
        }
      },
    },
    created: function () {

      blogApi.loadTopLists().then((data) => {
        blogKit.convertSubjectUrls(data.topViewPostsBlock);
        this.viewPosts = data.topViewPostsBlock;
      });
      blogApi.loadSideColumn().then((data) => {
        blogKit.convertSubjectUrls(data.catListComment);
        data.catListComment.map((v) => {
          v.body=emoji.parseText(v.body);
          this.catListComment.push(v);
          blogApi.loadCommitterFaceUrl(v.url, v.committer).then((picUrl) => {
            v.img = picUrl;
          });
        })
      });
      this.$bus.on("articleInited", function (dom) {
        this.selectItem=1;
      });
    }
  }
</script>

<style lang="scss">
  #pub_aside {
    width: 100%;
    font-size: 10px;
    background-color: #f9f9f9;

    .pub-body {
      padding: 13px 17px 13px 17px;
      box-sizing: border-box;
      background-color: #f9f9f9;
      position: relative;
      .pub-body-menulist{
        position: absolute;
        left: 7px;
        right: 5px;
      }
      .pub-body-title {
        margin-bottom: 15px;
        color: #58666e;
        font-size: 15px;
      }


      .pub-item {
        padding-bottom: 25px;

        .pub-face {
          background-size: cover !important;

          display: inline-block;

          vertical-align: top;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
          cursor: pointer;
          box-sizing: border-box;
        }

        .pub-item-wrap {
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          width: calc(100% - #{$headHeight});
          padding-left: 9px;
          font-size: 0;
          padding-right: 1px;
        }
      }


      .pub-body-comment {
        .item-title, .item-body, .item-committer {
          color: rgb(88, 102, 110);
          font-size: 12.5px;
          cursor: pointer;
        }

        .item-body {
          color: rgb(152, 166, 173);
        }

        .item-committer {
          float: right;
        }
      }

      .pub-body-view-posts {
        .item-title {
          color: #58666e;
          font-size: 12.5px;
          cursor: pointer;
          line-height: 17px;
        }

        .item-see, .item-see .icon {
          font-size: 10px;
          color: #98a6ad;
        }
      }
    }

    .pub-head {
      display: flex;
      border-bottom: 1px solid #e2e8ea;

      .article-menu-bottom {
        border-bottom: 1px solid #b4b4b4;
        box-sizing: border-box;
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
