<template>
  <div id="blog_category" class="main-center-frame">
    <div class="page-head" v-show="categoryType=='all'">
      <div class="author-name">{{categoryTitle()}}</div>
      <div class="author-sign">{{categorySign()}}</div>
    </div>
    <div class="page-head-article" v-show="categoryType!='all'">
      <div>{{categoryName}} 下的文章</div>
    </div>
    <div class="post-body-head post-body-title" v-show="categoryType!='all'">
      <span class="icon iconfont home"></span>
      <span>首页</span> <span class="sep">/</span>
      <span>{{categoryName.replace("随笔分类 - ","")}}</span>
    </div>
    <div class="page-list-body">
      <div class="page-item" v-for="(item,index) in articleList">
        <router-link tag="div" :to="VUE_CTX+'/works/article/'+item.pageId">
          <div class="item-left">
            <img :src="getRandomImg(index)" v-if="!item.img">
            <img :src="item.img" v-if="item.img">
          </div>
          <div class="item-right">
            <div class="item-title sing-ellipsis">
              {{item.title}}
            </div>
            <div class="item-content three-ellipsis">
              {{item.content}}
            </div>
            <div class="item-sign">
            <span class="item-sign-author">
                 <span class="icon iconfont renyuanguanli"></span>
                 <span>{{articleName()}}</span>
            </span>
              <span class="item-sign-time">
                  <span class="icon iconfont ios-shijian"></span>
                  <span>{{item.time}}</span>
            </span>
              <span class="item-sign-see">
                  <span class="icon iconfont see"></span>
                  <span>{{item.readNum}} 条阅读</span>
            </span>
            <span class="item-sign-talk">
                  <span class="icon iconfont talk"></span>
                  <span>{{item.commentNum}} 条评论</span>
            </span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="page-num">
        <ul class="pagination">
          <li v-for="item in pageList">
            <router-link tag="a" :to="VUE_CTX+'/works/category/'+categoryType+'/'+categoryId+'/'+item.num"
                         :class="{active:item.current}">
              {{item.text}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogKit from "../../../utils/BlogKit";
    import BlogApi from "../../../utils/BlogApi";
    import BlogConst from "../../../const/BlogConst";

    let imgList = Array.from(Array(BlogConst.pageItemImgs - 1), (v, k) => k).sort(() => Math.random() >= 0.5 ? 1 : -1).map((item) => BlogKit.getExtendStylePath("/img/pageItem/page-item-" + (1 + item) + ".jpg"));
    export default {
        name: "BlogCategory",
        created: function () {
            let params = this.$route.params;
            this.initBlogCategory(params.categoryId, params.page, params.categoryType);
        },
        beforeRouteEnter: function (to, from, next) {
            next();
        },
        beforeRouteUpdate: function (to, from, next) {
            let params = to.params;
            this.initBlogCategory(params.categoryId, params.page, params.categoryType);
            next();
        },
        beforeRouteLeave: function (to, from, next) {
            next();
        },
        methods: {
            articleName: () => {
                return BlogConst.blogName;
            },
            categoryTitle: () => {
                return BlogConst.blogName + "博客";
            },
            categorySign: () => {
                return BlogConst.blogSign;
            },
            getRandomImg: () => {
                let imgSrc = imgList.shift();
                imgList.push(imgSrc);
                return imgSrc;
            },
            getImg: (i) => {
                return imgList[i];
            },
            initBlogCategory: function (categoryId, page, categoryType) {
                let self = this;
                this.categoryId = categoryId;
                this.page = page;
                this.categoryType = categoryType;
                Promise.all([
                    new Promise((resolve, reject) => {
                        if (self.categoryType == 'all') {
                            BlogApi.loadAllArticle(self.page).then((data) => {
                                self.articleList = data.list;
                                self.pageList = data.pageList;
                                resolve();
                            });
                        } else if (self.categoryType == 'category') {
                            BlogApi.loadCategoryArticle(self.categoryId, self.page).then((data) => {
                                self.categoryName = data.categoryName;
                                self.articleList = data.list;
                                self.pageList = data.pageList;
                                resolve();
                            });
                        } else if (self.categoryType == 'archives') {
                            BlogApi.loadArchivesArticle(self.categoryId.replace("-", "/"), self.page).then((data) => {
                                self.categoryName = data.categoryName;
                                self.articleList = data.list;
                                self.pageList = data.pageList;
                                resolve();
                            });
                        }
                    }),
                ]).then(() => {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.$bus.emit('dataedRoute', true);
                            }, 150)
                        });
                    }, 150)
                });

            },
        },
        data: () => {
            return {
                categoryId: '',
                categoryType: '',
                page: '',
                pageList: [],
                articleList: [],
                categoryName: '',
            }
        }
    }
</script>

<style lang="scss">
  $itemImgWidth: 250px;
  #blog_category {
    .page-head {
      display: inline-block;
      width: 100%;
      padding: 12px 15px 12px 20px;
      border-bottom: 1px solid rgb(226, 232, 234);
      margin-bottom: 10px;
      box-sizing: border-box;
      background-color: white;

      .author-name {
        display: inline-block;
        font-size: 23px;
        color: black;

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
        margin-left: 10px;
        display: inline-block;
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
      }
    }

    .page-list-body {
      padding-bottom: 6px;

      .page-item:nth-last-of-type(2) {
        margin-bottom: 12px;
      }

      .page-item {
        border-radius: 5px;
        background-color: white !important;
        margin: 12px 20px 20px 20px;
        height: 100%;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
        overflow: hidden;

        .item-left {
          vertical-align: top;
          display: inline-block;
          width: auto;
          float: left;
          box-sizing: border-box;

          img {
            border-radius: 5px 0 0 5px;
            transform: translateY(-0.5px) translateX(1px);
            padding-top: 0.5px;
            box-sizing: border-box;
            cursor: pointer;
            @include itemBodyHeight;
            @include categoryImgWidth();
          }
        }

        .item-right {
          @include categoryBodyCalWidth();
          //width: calc(100% - #{$itemImgWidth});
          vertical-align: top;
          display: inline-block;
          box-sizing: border-box;
          position: relative;
          @include itemBodyHeight();
          @include itemRightFrame();
          position: relative;

          .item-title {
            @include itemTilteStyle();
            cursor: pointer;
          }

          .item-content {
            line-height: 25px;
            font-size: 14px;
            color: rgb(162, 176, 183);
            cursor: pointer;
            @include itemContentStyle()

          }

          .item-sign {
            position: absolute;
            bottom: 0px;

            border-top: 1px solid #dee5e7;
            padding-top: 4px;
            padding-bottom: 7px;
            box-sizing: border-box;
            color: rgb(162, 176, 183);
            font-size: 12px !important;
            cursor: pointer;
            @include itemSignStyle();

            .item-sign-author {
              @include deve1 {
                display: none;
              }
            }

            .item-sign-talk {

            }

            .icon {
              font-size: 10px !important;
            }

            > span:not(:first-child) {
              margin-left: 8px
            }
          }
        }
      }


      .page-num {
        margin-left: 20px;
        @include deve1 {
          margin-left: 0px;
        }
        width: 100%;
        text-align: center;
        font-size: 12px;


      }
    }
  }
</style>
