<template>
  <div id="article_message">
    <div class="article-message-wrap">
      <div class="message-title">
        评论列表
      </div>
      <div class="message-body-nocomment" v-if="!messageList||messageList.length==0">暂无评论</div>
      <div class="message-body-warp" v-if="messageList&&messageList.length>0">
        <div v-for="item in messageList" class="body-item">
          <div class="avatar-img">
            <img :src="item.avatarHdUrl" :onerror="'this.src=\''+item.avatarUrl+'\';this.onerror=null;'" @click="openCommenter(item.authorUrl)">
          </div>
          <div class="message-desc">
            <div class="message-desc-bar" @click="openCommenter(item.authorUrl)">
              <span class="desc-level">{{item.level}}</span>
              <span class="desc-author">{{item.author}}</span>
            </div>
            <div>
              <span class="desc-date">{{item.date}}</span>
            </div>
            <div>
              <div class="desc-content" v-html="item.desc"></div>
            </div>
          </div>
          <div class="message-btn-wrap">
            <div class="message-btn btn1">
              <span v-if="item.delBtn" @click="delComment(item.commentId)">删除</span>
              <span v-if="item.updateBtn" @click="updateComment(item.commentId)">修改</span>
              <span v-if="item.replayBtn" @click="replayComment(item.commentId,item.author)">回复</span>
              <span v-if="item.quoteBtn" @click="quoteComment(item.commentId,item.author)">引用</span>
            </div>
            <div class="message-btn btn2">
              <span @click="burryComment(item.commentId)"><span
                class="icon iconfont zan nozan"></span>{{item.burry}}</span>
              <span @click="diggComment(item.commentId)"><span class="icon iconfont zan"></span>{{item.digg}}</span>

            </div>
          </div>
        </div>
      </div>
      <pagination v-if="messageList&&messageList.length>0" :page-size="messageCount" :page-cur="messageCurrent" max-page="10"
                  @clickPage="clickPage"></pagination>
    </div>
  </div>
</template>

<script>
  import emoji from "../../../utils/EmojiUtils";
  import blogApi from "../../../utils/BlogApi";
  import Pagination from "../../common/Pagination";
  import utils from "../../../utils/BlogUtils";

  export default {
    name: "ArticleMessage",
    components: {Pagination},
    props: {
      articleId: {
        default: -1,
      },
    },
    data: () => {
      return {
        pageNum: 1,
        messageList: [],
        messageCount: 0,
        messageCurrent: -1
      }
    },
    watch: {
      articleId: function () {
        this.initMyCommentList(this.articleId, -1);
      },
    },
    created: function () {
      this.initMyCommentList(this.articleId, -1);
      this.$bus.on("commentCommitEvent",()=>{
        this.initMyCommentList(this.articleId, -1);
      });
      this.$bus.on("commentUpdateEvent",()=>{
        this.initMyCommentList(this.articleId, -1);
      });
    },
    methods: {
      openCommenter:function(url){
        window.open(url);
      },
      commentOpeEvent: function (obj) {
        utils.showInfoMsg(obj.message);
        this.initMyCommentList(this.articleId, this.pageNum);
      },
      diggComment: function (commentId) {
        blogApi.diggComment(this.articleId, commentId, false).then(this.commentOpeEvent);
      },
      burryComment: function (commentId) {
        blogApi.buryComment(this.articleId, commentId, false).then(this.commentOpeEvent);
      },

      delComment: function (commentId) {
        blogApi.deleteComment(commentId).then(this.commentOpeEvent);
      },
      updateComment:function(commentId){
        this.$emit('noticeUpdateEvent',commentId);
      },
      replayComment: function (commentId,commentName) {
        this.$emit('noticeReplayEvent',commentId,commentName);
      },
      quoteComment: function (commentId,commenter) {
        this.$emit('noticeQuoteEvent',commentId,commenter);
      },
      clickPage: function (changePage) {
        this.initMyCommentList(this.articleId, changePage);
      },
      /*重新初始化我的评论列表*/
      initMyCommentList: function (articleId, pageNum) {
        this.pageNum = pageNum;
        this.$bus.emit("barLoadingOpen");
        blogApi.loadMyCommentList(articleId, pageNum).then((data) => {
          this.messageList.splice(0,this.messageList.length);
          data.list.each((i,e)=>{
            e.desc=emoji.parseText(e.desc);
            this.messageList.push(e);
          });
          this.messageCount = parseInt(data.count);
          this.messageCurrent = parseInt(data.current);
          this.$bus.emit("barLoadingClose");
        });
      }
    }
  }
</script>

<style lang="scss">
  #article_message {
    .article-message-wrap {
      .message-title {
        font-size: 19px;
        color: #34495e;
        font-weight: 600;
        padding-bottom: 10px;
      }
      .message-body-nocomment{
        font-size: 15px;
        text-align: center;
        color: gray;
      }
      .message-body-warp {
        font-size: 15px;

        .body-item {
          vertical-align: top;
          width: 100%;
          position: relative;
          border-top: 1px solid #e7edef;
          padding-top: 12px;
          padding-bottom: 12px;
          box-sizing: border-box;

          .avatar-img {
            display: inline-block;
            padding-right: 10px;
            box-sizing: border-box;
            cursor: pointer;
            img {
              width: 45px;
              height: 45px;
              border-radius: 28px;
              box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
            }
          }

          .message-desc {

            vertical-align: top;
            display: inline-block;
            word-wrap: break-word;
            width: calc(100% - 60px);
            .message-desc-bar {
              cursor: pointer;
              display: inline-block;
              .desc-level {
                font-size: 13px;
                text-decoration: none;
                color: #333;
              }

              .desc-author {
                margin-left: 5px;
                font-size: 16px;
                display: inline-block;
                font-weight: 600;
                color: #58666e;
              }
            }

            .desc-date {
              font-size: 12px;
              color: rgba(152, 166, 173, .9);
              margin: 8px 0 8px 0;
            }

            .desc-content {
              font-size: 15px;
              color: #536269;
              line-height: 21px;
              margin-top: 5px;
              margin-bottom: 20px;

              a {
                color: #536269;
                text-decoration: none;
              }
              img{
                max-width: 100%;
                max-height: 100%;
              }
            }
          }

          .message-btn-wrap {
            display: inline-block;
            vertical-align: top;
            position: absolute;
            right: 0px;
            width: 150px;
            height: 100%;

            .message-btn {
              width: 100%;

              > span {
                font-size: 9px;
                padding: 2px 8px;
                cursor: pointer;
                border-radius: 10px;
                background-color: rgba(25, 169, 213, .2);
                box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
                color: rgba(80, 80, 80, .6);
                text-align: center;
                margin-right: 4px;
                text-align: center;
                float: right;
                height: 14px;
                line-height: 14px;
                .icon {
                  position: relative;
                  top: 1px;
                }

                .nozan {
                  display: inline-block;
                  transform: rotate(180deg);
                }
              }
            }

            .btn1 {
              position: absolute;
              top: 0;
            }

            .btn2 {
              position: absolute;
              bottom: 25px;
            }
          }

        }
      }
    }
  }
</style>
