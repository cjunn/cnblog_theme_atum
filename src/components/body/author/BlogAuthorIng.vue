<template>
  <div id="blog_author_ing">
    <div class="author-head-img-wrap">
      <img class="author-head-img" :src="headBackImg">
      <div class="author-head-content">
        <div class="author-head-content-wrap">
          <div>
            <div class="head-author-name">{{ingName()}}</div>
            <div class="head-author-sign">{{ingTitle()}}</div>
            <div class="head-author-info">
              <div class="head-author-info-item">
                <div class="head-info-num">{{info.commentNum}}</div>
                <div class="head-info-title">评价</div>
              </div>
              <div class="head-author-info-item">
                <div class="head-info-num">{{info.pageNum}}</div>
                <div class="head-info-title">文章</div>
              </div>
              <div class="head-author-info-item">
                <div class="head-info-num">{{ingObj.count}}</div>
                <div class="head-info-title">新鲜事</div>
              </div>
            </div>
          </div>
          <div class="head-bottom-wrap">
            <div class="head-bottom">
              <div class="head-bottom-icon">
                <span class="icon iconfont git"></span>
              </div>
              <div class="head-bottom-icon">
                <span class="icon iconfont wechat"></span>
              </div>
              <div class="head-bottom-icon">
                <span class="icon iconfont qq2"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="author-body-wrap">
      <div class="author-content-item" v-for="item in ingObj.cnList">
        <div class="author-content-img-wrap">
          <img :src="item.avatarHdUrl" :onerror="'this.src=\''+item.avatarUrl+'\';this.onerror=null;'">
        </div>
        <div class="author-content-body-wrap">
          <div class="author-content-arrow-back"></div>
          <div class="boadr-top-wrap">
            <span class="board-top-author">{{item.author}}</span>
            <span class="board-top-time">{{item.date}}</span>
          </div>
          <div class="board-middle-wrap" v-html="item.desc">
            {{item.desc}}
          </div>
          <div class="board-bottom-wrap">
            <span class="heart-wrap"><span class="icon iconfont heart"></span><span>{{item.digg||"0"}}</span></span>
            <span><span class="icon iconfont Icon-Fixedposition- position"></span><span>{{item.from||"博客园"}}</span></span>
          </div>
        </div>
      </div>
    </div>
    <pagination v-if="ingObj.pageNum" :page-size="ingObj.pageNum" :page-cur="ingObj.current" max-page="10" @clickPage="clickPage"></pagination>

  </div>
</template>

<script>
    import blogApi from "../../../utils/BlogApi";
    import BlogContext from "../../../context/BlogContext";
    import Pagination from "../../common/Pagination";
    export default {
      name: "BlogAuthorIng",
      components: {Pagination},
      created: function () {
            Promise.all([
                this.askIngList(),
                this.askInfo(),
            ]).then(() => {
              this.$bus.emit("fullLoadingClose");
            });
        },

        methods: {
            askInfo: function () {
                let self = this;
                return new Promise((resolve, reject) => {
                    blogApi.loadArticleNum().then((info) => {
                        self.info = info;
                        resolve();
                    }).catch(() => {
                        resolve();
                    })
                })
            },
            askIngList: function (openLoadBar) {
                let self = this;
                openLoadBar ? this.$bus.emit("barLoadingOpen"): '';
                return new Promise((resolve, reject) => {
                    blogApi.loadBlogTalk(this.current).then((data) => {
                        self.ingObj = data;
                        self.ingObj.current=data.pageNum;
                        openLoadBar ? this.$bus.emit("barLoadingClose") : '';
                        resolve();
                    }).catch(() => {
                        resolve();
                    })
                });
            },
            ingTitle: () => {
                return BlogContext.ingTitle;
            },
            ingName: () => {
                return BlogContext.blogName;
            },
            clickPage:function(current){
                this.current=current;
            }
        },
        data: () => {
            return {
                ingMinHeight:'',
                headBackImg: BlogContext.headBackImg,

                ingObj: {
                    cnList: [],
                    current: -1,
                    pageNum: 0,
                    count:0,
                },
                current: -1,
                info: {}
            }
        },
        watch: {
            current: function () {
                this.askIngList(true);
            }
        }
    }
</script>

<style lang="scss">
  $imgAllWidth: 84px;
  $itemTop: 20px;
  #blog_author_ing {
    position: relative;
    font-size: 0px;
    @include ingBodyWidth();
    vertical-align: top;
    display: inline-block;
    box-sizing: border-box;
    border-right: 1px solid #dee5e7;

    .author-head-img-wrap {
      height: 240px;
      @include deve2 {
        height: 200px;
      }
      @include deve1 {
        height: 136px;
      }
      border-bottom: 1px solid rgb(226, 232, 234);
      overflow: hidden;
      position: relative;

      .author-head-img {
        padding-left: 1px;
        width: calc(100% + 2px);
        z-index: 0;
        position: absolute;
        min-height: 100%;
      }

      .author-head-content {
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 40px;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, .3);
        @include deve1 {
          padding: 10px 20px 20px 20px;
        }

        .author-head-content-wrap {
          font-size: 0px;
          position: relative;
          top: 50%;
          transform: translateY(-50%);

          .head-bottom-wrap {
            .head-bottom-icon {
              cursor: pointer;
              margin: 6px 6px 0 0;
              display: inline-block;
              width: 28px;
              height: 28px;
              background-color: rgba(255, 255, 255, 0.95);
              border-radius: 14px;
              background-clip: padding-box;
              -moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
              -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
              box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
              text-align: center;

              .icon {
                line-height: 28px;
                font-size: 15px;
                color: rgb(88, 102, 110);
              }
            }

            .head-bottom-icon:hover {
              background-color: rgba(230, 230, 230, .9);
            }

            .head-bottom-icon:active {
              background-color: rgba(210, 210, 210, .9);
            }
          }

          .head-author-name {
            display: inline-block;
            font-size: 30px;
            font-weight: 600;
            color: #1e1e1e;
            @include deve1 {
              font-size: 25px;
            }
          }

          .head-author-sign {
            display: inline-block;
            font-size: 15px;
            padding-left: 15px;
            color: rgba(100, 100, 100, 0.9);
            @include deve1 {
              font-size: 10px;
            }
          }

          .head-author-info {
            display: inline-block;
            float: right;

            .head-author-info-item:not(:nth-last-of-type(1)) {
              margin-right: 30px;
            }

            .head-author-info-item {
              margin-top: 10px;
              display: inline-block;
              @include deve1 {
                margin-top: 2px;
              }

              .head-info-num {
                text-align: center;
                font-size: 25px;
                cursor: pointer;
                font-weight: 800;
                color: #58666e;
                @include deve1 {
                  font-size: 16px;
                }
              }

              .head-info-title {
                text-align: center;
                font-size: 13px;
                @include deve1 {
                  font-size: 10px;
                }
              }
            }
          }
        }
      }
    }

    .page-num {
      font-size: 13px;
      z-index: 2;
      width: 100%;
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgb(222, 229, 231);
      text-align: center;
      box-sizing: border-box;
    }

    .author-body-wrap {
      margin-bottom: 5px;

      .author-content-item:after {
        content: "";
        width: 1px;
        background-color: rgb(222, 229, 231);
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 43px;
        z-index: 0;
      }

      .author-content-item:nth-last-of-type(1) {
        padding-bottom: 30px;
      }

      .author-content-item:nth-of-type(1) {
        padding-top: 10px;
      }

      .author-content-item:nth-last-of-type(1):before {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 10px;
        height: 10px;
        left: 37px;
        border-radius: 5px;
        background-color: white;
        border: 1px solid rgb(222, 229, 231);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        z-index: 1;
      }

      .author-content-item {
        position: relative;
        padding-right: 40px;

        .author-content-img-wrap {
          position: relative;
          width: $imgAllWidth;
          text-align: center;
          display: inline-block;
          vertical-align: top;
          padding-top: $itemTop;
          z-index: 1;

          img {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 20px
          }
        }


        .author-content-body-wrap:after, .author-content-body-wrap:before {
          content: "";
          position: absolute;
          left: -10px;
          top: 8px;
          font-size: 0;
          line-height: 0;
          border-width: 10px;
          border-left-width: 0;
          border-style: dashed;
          border-right-style: solid;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-right-color: white;
        }

        .author-content-body-wrap:after {
          left: -8px;
        }

        .author-content-body-wrap:before {
          left: -10px;
          border-right-color: #dee5e7;
        }

        .author-content-body-wrap {
          position: relative;
          color: #58666e;
          box-sizing: border-box;
          margin-top: $itemTop;
          width: calc(100% - #{$imgAllWidth}) !important;
          display: inline-block;
          vertical-align: top;
          word-break: break-all;
          font-size: 14px;
          background-color: white;
          border: 1px solid #dee5e7;
          box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
          border-radius: 5px;

          .boadr-top-wrap {
            padding: 10px 10px 10px 14px;
            @include switchHeadBar {
              padding: 8px;
            }

            span {
              vertical-align: top;
            }

            .board-top-author {
            }

            .board-top-time {
              cursor: pointer;
              padding-right: 4px;
              font-size: 12px;
              float: right;
              color: #98a6ad;
            }
          }

          .board-middle-wrap {
            word-break: break-all;
            border-top: 1px solid #dee5e7;
            border-bottom: 1px solid #dee5e7;
            padding: 20px 14px 30px 14px;
            @include switchHeadBar {
              padding: 10px 9px 13px 9px;
            }
            color: rgb(88, 102, 110);
            font-size: 14px;

            a {
              color: #58666e;
            }
          }

          .board-bottom-wrap {
            display: inline-block;
            padding: 10px 0 4px 14px;
            @include switchHeadBar {
              padding: 6px 0 6px 9px;
            }
            color: rgb(150, 164, 171);
            font-size: 12px;

            span {
              cursor: pointer;
              vertical-align: top;
            }

            .icon {
              padding-right: 1px;
            }

            .heart {
              font-size: 14px;
              position: relative;
            }

            .position {
              position: relative;
              top: -2px;
            }

            .heart-wrap {
              margin-right: 5px;
            }
          }

          .board-bottom-wrap span:hover {
            color: rgb(130, 144, 151);
          }
        }
      }
    }

  }
</style>
