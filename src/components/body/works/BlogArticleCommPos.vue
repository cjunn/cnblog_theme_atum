<template>
  <div id="blog_article_comm_pos">
    <div class="post-comment-area">
      <div class="area-title-wrap">
        <span class="area-title">发表评论</span>
        <span class="commenter-area-name" v-if="username">{{username}}</span>
        <span class="right-bar-wrap">
          <span class="icon iconfont pin" title="引用" @click="quote()"></span>
          <span class="icon iconfont bold" title="加粗" @click="block()"></span>
          <span class="icon iconfont link" title="链接" @click="links()"></span>
          <span class="icon iconfont code" title="代码块" @click="insetCode()"></span>
          <span class="icon iconfont image-text" title="图片" @click="OpenImageUploadWindow()"></span>
        </span>
      </div>
      <div class="area-input-wrap">
        <textarea ref="reftextarea" id="comment_area_wrap" class="middle-base-scroll"
                  v-model="commitArea"></textarea>
      </div>
      <div class="area-bar-wrap">
            <span class="ext-wrap">
              <span ref="faceBtn" @click="openFaceEven"> <span class="icon iconfont face2"></span>表情</span>
              <span> <span class="icon iconfont pen"></span></span>
            </span>
        <div class="area-btn-wrap">
              <span class="comment-content-post" @click="commitComment">
                <span v-show="isAddComment">发表评论</span>
                <span v-show="!isAddComment">修改评论</span>
              </span>
          <span class="comment-content-cancel" v-show="!isAddComment" @click="cancelChangeComment">取消修改</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogApi from "../../../utils/BlogApi";
    import BlogUtils from "../../../utils/BlogUtils";
    import BlogKit from "../../../utils/BlogKit";
    import emoji from "../../../utils/EmojiUtils";
    import TextAreaUtils from "../../../utils/TextAreaUtils";

    export default {
        name: "BlogArticleCommPos",
        props: {
            pageId: {
                type: String
            },
        },
        mounted: function () {

        },
        created: function () {
            BlogApi.loadUserName().then((data) => {
                this.username = data.username;
            });
            this.$bus.on("commentReply", ({commentId, commenterName}) => {
                this.parentCommentId = commentId;
                this.commitArea = "@" + commenterName + "\n" + this.commitArea;
                this.$refs.reftextarea.focus();
            });
            this.$bus.on("commentChange", ({commentId, index}) => {
                BlogApi.loadCommentBody(commentId).then((data) => {
                    this.isAddComment = false;
                    this.chageCommentId = commentId;
                    this.chageIndex = index;
                    this.commitArea = data;
                    this.$refs.reftextarea.focus();
                })
            });
        },
        methods: {
            openFaceEven: function () {
                if (!this.$refs.faceBtn.isInit) {
                    this.$refs.faceBtn.isInit = true;
                    emoji.initTextArea("comment_area_wrap", this.$refs.faceBtn, (value) => {
                        this.commitArea = value;
                    });
                }
            },
            createWrap: function (pre, pos) {
                let textInfo = TextAreaUtils.getTextareaCursor(this.$refs.reftextarea);
                textInfo.text = pre + textInfo.text + pos;
                TextAreaUtils.addTextareaCursor(this.$refs.reftextarea, textInfo, textInfo.text);
            },
            quote: function () {
                this.createWrap("> ", "");
            },
            block: function () {
                this.createWrap("**", "**");
            },
            links: function () {
                this.createWrap("[](", ")");
                /*        let urlWrap = BlogUtils.insertUbbUrl();
                if (urlWrap) {
                  let textInfo = TextAreaUtils.getTextareaCursor(this.$refs.reftextarea);
                  textInfo.text = urlWrap;
                  TextAreaUtils.addTextareaCursor(this.$refs.reftextarea, textInfo, textInfo.text);
                }*/
            },
            insetCode: function () {
                this.createWrap("`", "`");
                /*BlogUtils.insertUbbCode((code) => {
                  this.commitArea = this.commitArea + code;
                });*/
            },
            OpenImageUploadWindow: function () {
                BlogUtils.OpenImageUploadWindow((imgUrl) => {
                    this.commitArea = this.commitArea + imgUrl;
                });
            },
            /*取消修改评论*/
            cancelChangeComment: function () {
                this.isAddComment = true;
                this.chageCommentId = '';
                this.$refs.reftextarea.focus();
            },
            /*提交评论*/
            commitComment: function () {
                if (!this.commitArea) {
                    BlogUtils.showInfoMsg('评论不可为空');
                    return;
                }
                if (this.isAddComment) {
                    BlogApi.addComment(this.pageId, this.parentCommentId, this.commitArea).then((data) => {
                        data.avatar = BlogKit.getExtendStylePath("/img/body/defAvatar.jpg")
                        this.$bus.emit("commitAdd", {data});
                        this.commitArea = '';
                        this.parentCommentId = 0;
                        BlogUtils.showInfoMsg('评论提交成功');
                    });
                } else {
                    BlogApi.updateComment(this.chageCommentId, this.commitArea).then((data) => {
                        if (data.isSuccess) {
                            BlogUtils.showInfoMsg('评论修改成功');
                            this.$bus.emit("commitUpdate", {chageIndex: this.chageIndex, data: data});
                            this.chageIndex = '';
                            this.chageCommentId = '';
                            this.isAddComment = true;
                            this.commitArea = '';
                        } else {
                            BlogUtils.showInfoMsg('评论修改失败');
                        }
                    })
                }
            },
        },
        data: () => {
            return {
                isAddComment: true,
                commitArea: '',
                parentCommentId: '',
                chageCommentId: '',
                chageIndex: '',
                username: '',
            }
        }
    }
</script>

<style lang="scss">
  #blog_article_comm_pos {


    .post-comment-area {
      color: rgba(50, 50, 50, .8);
      margin-bottom: 12px;
      position: relative;

      .area-title-wrap {

        padding-bottom: 2px;
        margin-bottom: 2px;

        .right-bar-wrap {
          float: right;
          position: relative;
          top: 8px;
          cursor: default;

          .icon {
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            padding-left: 4px;
            color: rgb(120, 120, 120);
          }

        }

        .area-title {
          font-size: 19px;
          margin-right: 5px;
          color: rgb(52, 73, 94);
          font-weight: 600;
        }

        .commenter-area-name {
          background-color: rgba(150, 150, 150, .2);
          line-height: 18px;
          height: 22px;
          display: inline-block;
          border-radius: 5px;
          position: relative;
          top: -2px;
          padding: 0px 4px 0px 4px;
        }
      }

      .area-btn-wrap {
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 6px;
        color: rgba(60, 60, 60, .8);
        position: absolute;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;

        > span {
          vertical-align: top;
          font-size: 14px !important;
          border: 1px solid rgba(160, 160, 160, .5);
          padding: 3px 35px 3px 35px;
          border-radius: 5px;
          background-color: rgba(135, 135, 135, .2);
          cursor: pointer;
        }

        .comment-content-post {

        }

        .comment-content-cancel {
          position: absolute;
          padding: 2px;
          margin-left: 4px;
          font-size: 9px !important;
          color: rgba(90, 90, 90, .8);
          margin-bottom: 8px;
        }


        > span:active {
          background-color: rgba(125, 125, 125, .4) !important;
        }

        > span:hover {
          background-color: rgba(115, 115, 115, .3);
        }
      }

      .area-bar-wrap {
        position: relative;

        .ext-wrap {
          @include switchHeadBar {
            display: none;
          }
          z-index: 1;
          position: relative;

          > span:hover {
            background-color: rgba(115, 115, 115, .3);
          }

          > span:active {
            background-color: rgba(125, 125, 125, .4);
          }

          > span {
            cursor: pointer;
            vertical-align: top;
            line-height: 18px;
            width: 60px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
            border: 1px solid rgba(160, 160, 160, .5);
            padding: 3px;
            font-size: 6px;
            margin: 3px 3px 3px 0;
            border-radius: 5px;
            background-color: rgba(190, 190, 190, .2);

            .face2 {
              font-weight: bold;
              font-size: 4px;
              margin-right: 5px;
            }
          }
        }
      }

      .area-input-wrap {
        width: 100%;
        height: 150px;
        padding: 4px 0 6px 0;
        border-color: rgba(230, 230, 230, .3);

        textarea:focus, textarea:hover {
          border: 1px solid rgba(35, 183, 229, .3);
        }

        textarea {
          width: 100%;
          height: 100%;
          outline: none;
          resize: none;
          padding: 5px;
          box-sizing: border-box;
          font-size: 13px;
          border-radius: 2px;
        }
      }
    }
  }
</style>
