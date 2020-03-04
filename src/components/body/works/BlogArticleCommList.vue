<template>
  <div id="blog_article_comm_list">
    <div class="area-title-no-wrap" v-if="commentInfo.size==0">
      暂无评论
    </div>
    <div class="area-title-wrap" v-if="commentInfo.size>0">
      评论列表
    </div>
    <div class="post-comment-num" v-if="commentInfo.size>1">
      <ul class="pagination">
        <li v-for="index in sizeList" @click="!isNaN(index)?pageCur=index:''">
          <a :class="{active:commentInfo.current==index}">{{index}}</a>
        </li>
      </ul>
    </div>
    <div class="post-comment-list">
      <div class="post-body-comment-wrap" v-for="(item,index) in commentInfo.list">
        <img class="commenter-head" :src="item.avatar" @click="openCommenter(item.commenterUrl)"/>
        <div class="commenter-body">
          <div class="comment-top-bar">
            <div class="comment-top-bar-left">
              <div class="commenter-counter" v-html="item.layerAnchor">
                {{item.layerAnchor}}
              </div>
              <div class="commenter-name">
                {{item.commenter}}
              </div>
            </div>
            <div class="comment-top-bar-right">
              <span class="post-body-comment-button comment-reply"
                    @click="commentReply(item.commentId,item.commenter)"
                    v-if="item.isReply">回复</span>
              <span class="post-body-comment-button comment-update"
                    @click="commentChange(item.commentId,index)"
                    v-if="item.isUpdate">修改</span>
              <span class="post-body-comment-button comment-delete"
                    @click="commentDelete(item.commentId,index)"
                    v-if="item.isDel">删除</span>
            </div>
          </div>
          <div class="commenter-time" id="bottom_article_time">{{item.time}}</div>
          <div class="commenter-body-content" v-html="item.commentBody" v-highlight>{{item.commentBody}}</div>
          <div class="comment-bottom-bar">
            <div class="comment-bottom-bar-right">
              <span class="post-body-comment-button comment-digg" @click="commentSupport(item.commentId,item.index)">
                <span class="icon iconfont zan"></span>
                <span class="oppose-num">{{item.support}}</span>
              </span>
              <span class="post-body-comment-button comment-bury" @click="commentBury(item.commentId,item.index)">
                <span class="icon iconfont zan nozan"></span>
                <span class="oppose-num">{{item.oppose}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import BlogApi from "../../../utils/BlogApi";
    import BlogUtils from "../../../utils/BlogUtils";
    import BlogConst from "../../../const/BlogConst";
    import emoji from "../../../utils/EmojiUtils";

    export default {
        props: {
            pageId: {
                type: String
            },
        },
        name: "BlogArticleCommList",
        created: function () {
            BlogApi.loadUserName().then((data) => {
                this.isChangeComment = (data == BlogConst.blogName);
            });
            this.$bus.on("commitAdd", ({data}) => {
                this.initCommentList();
            });

            this.$bus.on("commitUpdate", ({chageIndex, data}) => {
                this.initCommentList();
            });

        },
        methods: {
            openCommenter: function (url) {
                window.open(url);
            },
            sendScrollEven: function (anchor) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.$bus.emit("anchorScroll", anchor);
                        });
                    }, 150);
                });
            },
            initCommentList: function () {
                let anchor = this.$route.query.anchor;
                this.$bus.emit("openLoadingBar", {});
                if (anchor) {
                    BlogApi.loadArticleCommentInfoByAnchor(this.pageId, anchor).then((data) => {
                        data.list.forEach((e) => {
                            e.commentBody = e.commentBody.replace(new RegExp("_src", 'g'), "src");
                            e.commentBody = emoji.parseText(e.commentBody);
                        });
                        this.commentInfo = data;
                        this.$bus.emit("closeLoadingBar", {});
                        this.sendScrollEven(anchor);
                    });
                } else {
                    BlogApi.loadArticelCommentInfo(this.pageId, this.pageCur).then((data) => {
                        data.list.forEach((e) => {
                            e.commentBody = e.commentBody.replace(new RegExp("_src", 'g'), "src");
                            e.commentBody = emoji.parseText(e.commentBody);
                        });
                        this.commentInfo = data;
                        this.$bus.emit("closeLoadingBar", {});
                    });
                }
            },
            /*修改评论*/
            commentChange: function (commentId, index) {
                if (isNaN(commentId)) {
                    BlogUtils.showInfoMsg("该条评论暂时无法修改!");
                    return;
                }
                this.$bus.emit("commentChange", {commentId, index});
            },
            commentDelete: function (commentId, index) {
                BlogUtils.showInfoMsg("暂未支持删除");
            },
            /*评论支持*/
            commentSupport: function (commentId, index) {
                if (!commentId) {
                    BlogUtils.showInfoMsg("暂时无法提交支持");
                }
                BlogApi.commentDigg(commentId).then((data) => {
                    if (data.isSuccess) {
                        BlogUtils.showInfoMsg(data.message);
                        this.initCommentList();
                    } else {
                        BlogUtils.showErrMsg(data.message);
                    }
                });
            },
            /*评论不支持*/
            commentBury: function (commentId) {
                if (!commentId) {
                    BlogUtils.showInfoMsg("暂时无法提交反对");
                }
                BlogApi.commentBury(commentId).then((data) => {
                    if (data.isSuccess) {
                        BlogUtils.showInfoMsg(data.message);
                        this.initCommentList();
                    } else {
                        BlogUtils.showErrMsg(data.message);
                    }
                });
            },
            /*评论回复*/
            commentReply: function (commentId, commenterName) {
                this.$bus.emit("commentReply", {commentId, commenterName});
            },
        },
        data: function () {
            return {
                pageCur: -1,//当前页
                commentInfo: {list: [], size: 0, current: 1},
                isChangeComment: true,
            }
        },
        computed: {
            sizeList: function () {
                return BlogUtils.computePageList(this.commentInfo.size, this.commentInfo.current, 10);
            }
        },
        mounted: function () {

            this.initCommentList();
        },
        watch: {
            pageId: function (pageId) {
                this.initCommentList();
            },
            pageCur: function () {
                this.initCommentList();
            }
        }
    }
</script>

<style lang="scss">
  #blog_article_comm_list {
    .area-title-no-wrap {
      font-size: 15px;
      color: rgb(52, 73, 94);
      font-weight: 600;
    }

    .area-title-wrap {
      padding-bottom: 2px;

      font-size: 19px;
      margin-right: 5px;
      color: rgb(52, 73, 94);
      font-weight: 600;
    }

    .post-comment-num {
      border-top: 1px solid rgb(226, 232, 235);
      text-align: center;
      padding-top: 13px;
      padding-bottom: 7px;
      font-size: 12px;
    }

    .post-comment-list {
      a:link, a:visited {
        color: #444;
        text-decoration: none;
      }

      a:hover {
        color: #ff0000;
      }

      .post-body-comment-wrap {
        width: 100%;
        margin-bottom: 12px;
        padding-top: 15px;
        padding-bottom: 5px;
        border-top: 1px solid rgb(231, 237, 239);

        .commenter-head {
          cursor: pointer;
          display: inline-block;
          width: 45px;
          height: 45px;
          border-radius: 23px;
          box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
          overflow: hidden;
          vertical-align: top;
        }

        .commenter-body {
          vertical-align: top;
          display: inline-block;
          padding-left: 8px;
          box-sizing: border-box;
          width: calc(100% - 45px - 8px);


          .commenter-time {
            font-size: 10px;
            color: rgba(152, 166, 173, .9);
            margin-bottom: 3px;
          }

          .commenter-body-content {
            color: #536269;

            p {
              word-wrap: break-word;
              word-break: normal;
            }

            img {
            }
          }

          .comment-bottom-bar {
            width: 100%;
            font-size: 0px;

            .comment-bottom-bar-right {
              margin-top: 4px;
              float: right;

              .post-body-comment-button {
                padding: 2px 7px 2px 7px;

                .zan {
                  position: relative;
                  top: 1px;
                }

                .nozan {
                  top: 2px;
                  display: inline-block;
                  transform: rotate(180deg);
                }
              }

              span {
                margin-left: 5px;
              }
            }
          }

          .comment-top-bar {
            width: 100%;
            height: 22px;
            margin-bottom: 3px;

            .comment-top-bar-left {
              display: inline-block;
              float: left;

              .commenter-counter {
                display: inline-block;
                color: rgb(88, 102, 110);
                padding-right: 8px;
                font-size: 12px;

                a {
                  text-decoration: none;
                  color: #333;
                }
              }

              .commenter-name {
                display: inline-block;
                font-weight: 600;
                color: rgb(88, 102, 110);
              }
            }


            .comment-top-bar-right {
              display: inline-block;
              float: right;


            }
          }
        }
      }
    }
  }
</style>
