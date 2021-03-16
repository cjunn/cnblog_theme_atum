<template>
  <div id="articles_comment">
    <div>
      <div class="comment-top">
        <span class="comment-title">发表评论</span>
        <span class="right-bar-wrap">
            <span title="引用" class="icon iconfont pin" @click="commentQuote()"></span>
            <span title="加粗" class="icon iconfont bold" @click="commentBold()"></span>
            <span title="链接" class="icon iconfont link" @click="commentLink()"></span>
            <span title="代码块" class="icon iconfont code" @click="commentCode()"></span>
            <span title="图片" class="icon iconfont image-text" @click="commentImg()"></span>
          </span>
      </div>
      <div class="comment-textarea">
        <textarea class="middle-base-scroll" ref="refTextArea" v-model="commentBody" id="comment_area_wrap"></textarea>
      </div>
      <div class="comment-bottom">
        <div class="opt-bar">
            <span class="ext-wrap">
              <span @click="openFaceEven" ref="faceBtn"><span class="icon iconfont face2"></span>&nbsp;表情</span>
              <!--<span><span class="icon iconfont pen" @click="quickResponseEven"></span></span>-->
            </span>
        </div>
        <div class="comment-btn">
          <span @click="pushCommentEvent" v-if="commentId==''">发表评论</span>
          <span @click="pushCommentEvent" v-if="commentId!=''">更新评论</span>
          <span @click="cancelCommentEvent" class="cancel" v-if="commentId!=''">取消修改</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import blogUtils from "../../../utils/BlogUtils";
  import EmojiUtils from "../../../utils/EmojiUtils";
  import blogApi from "../../../utils/BlogApi";
  export default {
    props: {
      articleId: {
        default: -1,
      },
    },
    data:()=>{
        return {
          commentId:"",
          commentBody:"",
          replayCommentId:"",
          replayCommenter:"",
        }
    },
    name: "ArticleComment",
    methods:{
      pushCommentEvent:function(){
        if(!this.commentId){
          blogApi.addComment(this.articleId,this.commentBody,this.replayCommentId).then((obj)=>{
            this.$bus.$emit("commentCommitEvent");
            blogUtils.showInfoMsg("评论提交成功");
            this.cancelCommentEvent();
          })
        }else{
          blogApi.updateComment(this.commentId,this.commentBody).then((obj)=>{
            this.$bus.$emit("commentUpdateEvent");
            blogUtils.showInfoMsg("评论更新成功");
            this.cancelCommentEvent();
          });
        }
      },
      cancelCommentEvent:function(){
        this.commentId="";
        this.commentBody="";
        this.replayCommentId="";
        this.replayCommenter="";
      },
      setReplayCommentId:function(commentId,commenter){
        this.replayCommentId=commentId;
        this.replayCommenter=commenter;
        this.commentBody="@"+commenter+"\n"+this.commentBody;
        this.$refs.refTextArea.focus();
      },
      setQuoteCommentId:function(commentId,commenter){
        this.replayCommentId=commentId;
        this.replayCommenter=commenter;
        blogApi.getCommentBody(commentId).then((body)=>{
          let appendBody="@"+commenter+"\n";
          body.split("\n").forEach((e,i)=>{
            appendBody=appendBody+"> "+e+"\n";
          })
          appendBody=appendBody+"\n";
          this.commentBody=appendBody+this.commentBody;
          this.$refs.refTextArea.focus();
        });

      },
      setUpdateCommentId:function(commentId){
        this.commentId=commentId;
        blogApi.getCommentBody(commentId).then((body)=>{
          this.commentBody=body+"\n";
        });
        this.$refs.refTextArea.focus();
      },
      quickResponseEven:function(){
        this.commentBody = "滴，打卡上车  "+BlogUtils.getNowTime();
      },
      openFaceEven: function () {
        if (!this.$refs.faceBtn.isInit) {
          this.$refs.faceBtn.isInit = true;
          EmojiUtils.initTextArea("comment_area_wrap", this.$refs.faceBtn, (value) => {
            this.commentBody = value;
          });
        }
      },
      createWrap: function (pre, pos) {
        let textAreaUtils=blogUtils.textAreaUtils;
        let textInfo = textAreaUtils.getTextareaCursor(this.$refs.refTextArea);
        textInfo.text = pre + textInfo.text + pos;
        textAreaUtils.addTextareaCursor(this.$refs.refTextArea, textInfo, textInfo.text);
      },
      commentQuote:function(){
        this.createWrap("> ", "");
      },
      commentBold:function(){
        this.createWrap("**", "**");
      },
      commentLink:function(){
        this.createWrap("[](", ")");
      },
      commentCode:function(){
        this.createWrap("`", "`");
      },
      commentImg:function(){
        blogUtils.cnblogUtils.openImageUploadWindow((imgUrl) => {
          this.commentBody = this.commentBody + imgUrl;
        })
      }
    }
  }
</script>

<style lang="scss">
  #articles_comment {
    .comment-top {
      margin-bottom: 12px;

      .comment-title {
        font-size: 19px;
        color: #34495e;
        font-weight: 600;
      }

      .right-bar-wrap {
        float: right;
        position: relative;
        top: 10px;

        .icon {
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          padding-left: 4px;
          color: #787878;
        }
      }
    }

    .comment-textarea {
      height: 200px;
      textarea {
        width: 100%;
        height: 100%;
        outline: none;
        resize: none;
        padding: 5px;
        line-height: 18px;
        border: 1px solid rgba(149, 149, 149,.7);
        box-sizing: border-box;
      }

      textarea:focus {
        border: 1px solid rgb(210, 210, 210);
      }
    }

    .comment-bottom {
      position: relative;
      margin-top: 4px;
      .comment-btn{
        position: absolute;
        top: 7px;
        width: 100%;
        text-align: center;
        span{
          vertical-align: top;
          font-size: 14px;
          border: 1px solid hsla(0,0%,62.7%,.5);
          padding: 3px 35px;
          border-radius: 5px;
          background-color: hsla(0,0%,52.9%,.2);
          cursor: pointer;
        }
        .cancel{
          padding: 3px 8px;
          font-size: 11px;
          vertical-align: bottom;
          margin-left: 5px;
          position: absolute;
        }
      }
      .comment-btn{
        span:hover{
          background-color: rgba(115, 115, 115, .3);
        }
        span:active{
          background-color: rgba(125, 125, 125, .4) ;
        }

      }
      .opt-bar {
        .ext-wrap {
          > span {
            vertical-align: top;
            line-height: 18px;
            width: 60px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
            border: 1px solid hsla(0, 0%, 62.7%, .5);
            padding: 3px 3px 1px 3px;
            margin: 3px 3px 3px 0;
            border-radius: 5px;
            background-color: hsla(0, 0%, 74.5%, .2);
            font-size: 9px;
            z-index: 1;
            position: relative;
          }
          > span:hover{
            background-color: rgba(115, 115, 115, .3);
          }
          > span:active{
            background-color: rgba(125, 125, 125, .4) ;
          }

        }
      }
    }

  }
</style>
