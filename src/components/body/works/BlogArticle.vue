<template>
  <div id="blog_article">
    <div class="page-head">
      <div class="author-name">
        <span>
            {{article.title}}
        </span>
        <span class="icon iconfont eye" @click="openFullScreenEven"></span>
        <span class="eye-explain"></span>
      </div>
      <div class="author-sign">
        <span>
          <span class="icon iconfont renyuanguanli"></span>
          <span>{{articleName()}}</span>
        </span>
        <span>
          <span class="icon iconfont ios-shijian"></span>
          <span>{{article.time}}</span>
        </span>
        <span>
           <span class="icon iconfont see"></span>
           <span>{{viewCount}}</span><span>次浏览</span>
        </span>
        <span>
           <span class="icon iconfont talk"></span>
          <span>{{commentCount}}</span><span>条评论</span>
        </span>
        <span>
           <span class="icon iconfont pen"></span>
           <span>{{article.fontNum}}</span>
           <span>字数</span>
        </span>
        <span>
           <span class="icon iconfont label"></span>
           <span>
             <span v-for="item in labelList" class="label-item">
               <router-link :to="VUE_CTX + '/works/category/tag/' + item.id + '/1'"
                            tag="span"> {{item.text}}</router-link>
             </span>
           </span>
        </span>
      </div>
    </div>
    <div class="post-body">
      <div class="post-body-head post-body-title">
        <span class="icon iconfont home"></span><span>首页</span> <span class="sep">/</span> <span>正文</span>
        <span class="right-area">
          <span>分享到 :</span>
          <span class="icon iconfont weibo" @click="shareToTsina()"></span>
          <span class="icon iconfont wechat" @click="shareOnWechat()"></span>
        </span>
      </div>
      <div class="post-body-content post-body-item">
        <div class="post-body-content-wrap" ref="articleBody" v-html="article.body" v-highlight>
          {{article.body}}
        </div>
        <div class="post-body-content-info">
          <div class="last-time"><span class="icon iconfont ios-shijian"></span>
            最后修改：<span>{{article.time}}</span>
          </div>
          <div class="post-body-bottom">
            <span class="post-bottom-item" @click="diggAction()">
                <span class="icon iconfont zan"></span>
                <span v-show="!isDigg">已推荐</span>
                <span v-show="isDigg">点击推荐</span>
            </span>
            <span class="post-bottom-item" @click="fucusAction()">
                <span class="icon iconfont heart"></span>
                <span v-show="!isFucus">已关注</span>
                <span v-show="isFucus">点击关注</span>
            </span>
            <span class="post-bottom-item" @click="addToWz()">
                <span class="icon iconfont star"></span>收藏该文
            </span>

          </div>
          <div class="post-body-bottom">
            <span class="post-bottom-item" @click="shareToTsina()">
                <span class="icon iconfont weibo"></span>微博
            </span>
            <span class="post-bottom-item" @click="shareOnWechat()">
                <span class="icon iconfont wechat"></span>微信
            </span>
            <!--<span class="post-bottom-item">
                <span class="icon iconfont details_admire_icon"></span>赞赏
            </span>-->
          </div>
        </div>
      </div>
      <div class="post-turning post-body-item">
        <router-link :if="prePageId" :to="VUE_CTX+'/works/article/'+prePageId" tag="span" class="post-turning-pre">上一篇
        </router-link>
        <router-link :if="posPageId" :to="VUE_CTX+'/works/article/'+posPageId" tag="span" class="post-turning-pos">下一篇
        </router-link>
      </div>
      <div class="post-body-comment post-body-item">
        <blog-article-comm-pos :pageId="pageId"></blog-article-comm-pos>
      </div>
      <div class="post-body-comment post-body-item">
        <blog-article-comm-list :pageId="pageId"></blog-article-comm-list>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogApi from "../../../utils/BlogApi";
    import BlogUtils from "../../../utils/BlogUtils";
    import BlogKit from "../../../utils/BlogKit";
    import BlogArticleCommPos from "./BlogArticleCommPos";
    import BlogArticleCommList from "./BlogArticleCommList";
    import BlogConst from "../../../const/BlogConst";

    export default {
        components: {BlogArticleCommList, BlogArticleCommPos},
        created: function () {
            let params = this.$route.params;
            let query = this.$route.query;
            this.initBlogArticle(params.pageId, query.anchor);
            window.ttt = this;
        },
        beforeRouteUpdate: function (to, from, next) {
            let params = to.params;
            let query = to.query;
            this.initBlogArticle(params.pageId, query.anchor);
            next();
        },
        methods: {
            articleName: function () {
                return BlogConst.blogName
            },
            openFullScreenEven: function () {
                this.$bus.emit("openFullScreenEven", {
                    title: this.article.title,
                    body: this.article.body
                });
            },
            addToWz: function () {
                return BlogApi.addToWz(this.pageId)
            },
            shareToTsina: function () {
                return BlogApi.shareToTsina()
            },
            shareOnWechat: function () {
                return BlogApi.shareOnWechat()
            },
            /*推荐*/
            diggAction: function () {
                BlogApi.blogpost(this.pageId).then((data) => {
                    BlogUtils.showInfoMsg(data.message);
                });
            },
            /*关注*/
            fucusAction: function () {
                BlogApi.blogFollow().then((data) => {
                    BlogUtils.showInfoMsg(data);
                });
            },
            initBlogArticle: function (pageId, anchor) {
                let self = this;
                this.pageId = pageId;
                Promise.all([
                    /*初始化文章*/
                    new Promise((resolve, reject) => {
                        BlogApi.loadArticle(this.pageId).then((data) => {
                            self.article = data;
                            resolve();
                        }).catch(() => {
                            resolve();
                        });
                    }),
                    /*初始化是否点赞过*/
                    new Promise((resolve, reject) => {
                        BlogApi.loadBlogPostInfo(this.pageId).then((data) => {
                            self.isDigg = data.digg;
                            self.isFucus = data.fucus;
                            resolve();
                        }).catch(() => {
                            resolve();
                        });
                    }),
                    /*初始化评论数*/
                    new Promise((resolve, reject) => {
                        BlogApi.loadCommentCount(this.pageId).then((data) => {
                            self.commentCount = data;
                            resolve();
                        }).catch(() => {
                            resolve();
                        });
                    }),
                    /*初始化阅读数*/
                    new Promise((resolve, reject) => {
                        BlogApi.loadViewCount(this.pageId).then((data) => {
                            self.viewCount = data;
                            resolve();
                        }).catch(() => {
                            resolve();
                        });
                    }),
                    /*初始化上下页标签*/
                    new Promise((resolve, reject) => {
                        BlogApi.loadCategoriesTags(this.pageId).then((data) => {
                            self.labelList = data;
                            resolve();
                        });
                    }),
                    /*初始化上下页*/
                    new Promise((resolve, reject) => {
                        BlogApi.loadPrevnext(this.pageId).then((data) => {
                            self.prePageId = data.prePageId;
                            self.posPageId = data.posPageId;
                            resolve();
                        });
                    }),


                ]).then(() => {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.$bus.emit("articleInited", this.$refs.articleBody);
                                this.$bus.emit('dataedRoute', true);
                            }, 150)
                        });
                    }, 150)
                })
            }
        },
        beforeDestroy: function () {
            this.$bus.emit("articleDestroy", true);
        },
        name: "BlogArticle",
        data: () => {
            return {
                isFucus: '',
                isDigg: '',
                pageId: '',
                article: {
                    title: '',
                    body: '',
                    fontNum: 0,
                    time: '',
                },
                viewCount: 0,
                commentCount: 0,
                prePageId: '',
                posPageId: '',
                labelList: [],
            }
        }
    }
</script>

<style lang="scss">
  #blog_article:after {
    content: "";
    border-right: 1px solid #dee5e7;
    font-size: 1px;
    position: absolute;
    top: 0;
    bottom: 0;
    @include worksAsideLeft();
    overflow: hidden;
  }

  #blog_article {
    display: inline-block;
    vertical-align: top;
    font-size: 0px;
    width: 880px;
    @include worksBodyWidth();
    height: auto;
    box-sizing: border-box;

    .page-head {
      display: inline-block;
      width: 100%;
      padding: 18px 15px 22px 20px;
      border-bottom: 1px solid rgb(226, 232, 234);
      margin-bottom: 10px;
      box-sizing: border-box;
      background-color: white;

      .author-name {
        font-size: 23px;
        padding-bottom: 6px;

        .eye {
          margin-left: 10px;
          cursor: pointer;
        }

        .eye-explain {
          font-weight: normal;
          font-size: 8px;
          position: relative;
          color: rgba(100, 100, 100, .7);
          top: -2px;
        }
      }

      .author-sign {
        margin-top: 6px;
        color: rgb(152, 166, 173);
        font-size: 12px;

        > span {
          vertical-align: top;
          margin-right: 10px;

          .icon {
            margin-right: 1px;
          }
        }

        .renyuanguanli, .ios-shijian, .see, .label {
          font-size: 11px;
        }

        .label-item {
          cursor: pointer;
        }
      }
    }


    .post-body {
      font-size: 15px;


      .post-body-title {
        color: rgb(88, 102, 110);
        padding: 8px 15px 6px 15px;
        margin: 10px 15px 10px 15px;
        background-color: white;
        font-size: 14px;
        border: 1px solid rgb(238, 238, 238);
        box-sizing: border-box;
        border-radius: 5px;

        span {
          cursor: pointer;
        }

        .right-area {
          float: right;

          .weibo {
            margin-left: 8px;
            margin-right: 4px;
          }
        }

        .sep {
          font-size: 13px;
          color: #ccc;
          margin-left: 2px;
          margin-right: 2px;
        }

        span {
          vertical-align: top;
        }

        .home {
          margin-right: 2px;
        }
      }

      .post-body-item {
        background-color: white;
        padding: 10px 20px 10px 20px;
        margin: 10px 15px 10px 15px;
        box-shadow: 1px 1px 2px rgba(80, 80, 80, .2);
        border-radius: 5px;
        border: 1px solid rgba(240, 240, 240, .8);
        font-size: 15px;
      }

      .post-body-head {
        span {
          cursor: pointer;
        }
      }

      .post-turning {
        background-color: transparent;
        box-shadow: 0px 0px 0px;
        height: 30px;
        padding: 0px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 0px;

        .post-turning-pre, .post-turning-pos {
          display: inline-block;
          background-color: white;
          box-shadow: 1px 1px 2px rgba(80, 80, 80, .2);
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid rgba(240, 240, 240, .8);
          padding: 5px 8px 5px 8px;
          font-size: 12px;
          color: rgb(86, 104, 114);
        }

        .post-turning-pre {
          float: left;
        }

        .post-turning-pos {
          float: right;
        }
      }

      .post-body-comment {
        padding-top: 14px;
        @include switchHeadBar(){
          padding-bottom: 25px;
        }
        .post-body-comment-button {
          font-size: 10px;
          padding: 2px 10px 2px 10px;
          cursor: pointer;
          border-radius: 10px;
          background-color: rgba(25, 169, 213, .2);
          box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
          color: rgba(80, 80, 80, .6);
          text-align: center;

          span {
            margin-left: 0 !important;
          }
        }


      }

      .post-body-content {
        .post-body-content-info {

          .last-time {
            margin-top: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 12px;
            color: #9b9b9b;
            border-bottom: 1px solid #dce3e5;

            .icon {
              font-size: 10px;
              font-weight: bold;
            }
          }

          .post-body-bottom {
            font-size: 15px;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: center;
            font-size: 14px;
            color: rgba(60, 60, 60, .95);

            .post-bottom-item:hover {
              background-color: rgba(220, 220, 220, .7);
            }

            .post-bottom-item:active {
              background-color: rgba(220, 220, 220, .6);
            }

            .post-bottom-item {
              display: inline-block;
              padding: 2px 8px 2px 8px;
              margin-top: 3px;
              background-color: rgba(240, 240, 240, .8);
              box-shadow: 0px 0px 3px rgba(0, 0, 0, .1);
              border-radius: 10px;
              border: 1px solid rgb(204, 204, 204);
              cursor: pointer;
            }
          }
        }


        .post-body-content-fiex-wrap {
          //////////////
          -moz-transform-origin: 0 0;
          -webkit-transform-origin: 0 0;
          -o-transform-origin: 0 0;
          transform-origin: center;
          -webkit-transition: all .3s ease-in;
          background: rgb(224, 216, 200);
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          text-align: center;
          padding: 20px;
          display: none;
          overflow-y: scroll;

          .post-body-fiex-close {
            display: inline-block;
            position: fixed;
            right: 0;
            top: 0;
            cursor: pointer;
            margin: 10px;

            span {
              font-size: 35px !important;
              color: rgba(80, 80, 80, .4);

            }
          }

          .post-body-fiex-menu {
            text-align: left;
            display: inline-block;
            position: fixed;
            margin-right: 10px;
            right: 0;
            top: 40px;
            height: 500px;
            width: 250px;
            font-size: 12px;

            #post_body_fiex_menu_anchor {
              width: 250px;
              position: relative;
              background: rgba(250, 250, 250, .5);
              border-radius: 5px;
              box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);

              .toc-brand {
                margin-bottom: 10px !important;
              }
            }
          }

          .post-body-content-fiex-inner-wrap {
            display: inline-block;
            width: 800px;
            padding: 50px 55px 40px 55px;
            box-sizing: border-box;
            margin: 0 auto;
            background: rgb(248, 241, 226);
            box-shadow: 0 6px 12px 3px rgba(0, 0, 0, .2);
            border-radius: 3px;
            text-align: left;
          }
        }

        #post_body_title_fullscreen {
          width: 100%;
          font-weight: bold;
          text-align: center;
          font-size: 25px;
          margin-bottom: 10px;
        }

        .post-body-content-wrap, .post-body-content-fiex-wrap {
          padding-top: 10px;
          font-size: 15px;
          box-sizing: border-box;

        }
      }
    }
  }
</style>
