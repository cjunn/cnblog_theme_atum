<template>
  <div id="article_pre_line">
    <div class="post-body-head post-body-title">
      <span class="icon iconfont home"></span>
      <span>首页</span>
      <span class="sep">/</span>
      <span>正文</span>
      <span class="right-area">
        <span>分享到 :</span>
        <span class="icon iconfont weibo" @click="openWeiBo"></span>
        <span class="icon iconfont wechat" @click="openWechat"></span>
      </span>
    </div>
  </div>
</template>

<script>
  import blogKit from "../../../utils/BlogKit";
    export default {
        name: "ArticlePreLine",
        methods:{
          openWeiBo:()=>{
            blogKit.shareToTsina();
          },
          openWechat:()=>{
            blogKit.shareOnWechat();
          }
        }
    }
</script>

<style lang="scss">
  #article_pre_line{
    font-size: 12px;
    .post-body-title {
      color: rgb(88, 102, 110);
      padding: 8px 15px 6px 15px;
      margin: 10px 15px 0px 15px;
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
  }
</style>
