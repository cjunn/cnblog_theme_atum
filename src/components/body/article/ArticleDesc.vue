<template>
    <div id="article_desc">
        <div class="article-page-body-wrap">
          <div class="inner-body-wrap">
              <div v-html="articleObj.body" ref="articleBody"  v-highlight></div>
              <div class="body-wrap-bottom"><span class="icon iconfont ios-shijian"></span> 最后修改时间：{{articleObj.time}}</div>
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
          <div class="post-article-right">
            <div @click="openEdit">
              <span class="icon iconfont pen"></span>
              <span>编辑</span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import blogApi from "../../../utils/BlogApi";
  import blogUtils from "../../../utils/BlogUtils";
  import blogKit from "../../../utils/BlogKit";
    export default {
        props: ['articleObj'],
        name: "ArticleDesc",
        data:()=>{
          return {
            isFucus: '',
            isDigg: '',
          }
        },
        methods:{
          openEdit:function(){
            window.open(this.articleObj.editUrl);
          },
          initPageList:function(){
            this.$nextTick(()=>{
              this.articleObj.pageId?blogApi.loadBlogPostInfo(this.articleObj.pageId).then((data) => {
                this.isDigg = data.digg;
                this.isFucus = data.fucus;
                this.$bus.emit("articleInited", this.$refs.articleBody);
              }):'';
            });
          },
          diggAction:function(){
            blogApi.voteBlogPost(this.articleObj.pageId,false).then((data) => {
              blogUtils.showInfoMsg(data.message);
            });
          },
          fucusAction:function(){
            blogApi.blogFollow().then((data) => {
              blogUtils.showInfoMsg(data);
            });
          },
          addToWz:function(){
            return blogKit.addToWz(this.articleObj.pageId)
          }
        },
        mounted:function() {
           this.initPageList();
        },
        watch: {
          articleObj() {
            this.initPageList();
          },
        },
        beforeDestroy: function () {
          this.$bus.emit("articleDestroy", true);
        },

    }
</script>

<style lang="scss">
  #article_desc{
    .article-page-body-wrap{

      font-size: 15px;
      box-sizing: border-box;
      .inner-body-wrap{
        border-bottom: 1px solid lightgrey;
        .body-wrap-bottom{
          font-size: 12px;
          color: #9b9b9b;
          padding-top: 5px;
          padding-bottom: 8px;
          .ios-shijian{
            font-size: 11px;
          }
        }

      }
      .post-body-bottom {
        font-size: 15px;
        margin-top: 8px;
        margin-bottom: 8px;
        text-align: center;
        font-size: 12px;
        color: rgba(60, 60, 60, .95);
        @include switchHeadBar(){
          font-size: 10px;
        }
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
          margin-left: 4px;
          margin-right: 4px;
          @include switchHeadBar(){
            height: 18px;
            line-height: 14px;
            .icon{
              position: relative;
              top:1px;
            }
          }
        }
      }
      .post-article-right{
        padding-top: 5px;
        text-align: right;
        >div{
          cursor: pointer;
          display: inline-block;
          >span,.icon{
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
