<template>
  <div id="category_body">
    <div class="category-body-wrap">
      <div class="head-title">
        <div class="title-font" v-if="title">{{title}}</div>
        <div class="title-thumb" v-if="!title">{{categoryTitle}}</div>
        <div class="title-sign "  v-if="!title">{{categorySign}}</div>
      </div>
      <div class="article-list-wrap">
        <router-link v-for="(item,key) in arrList" :key="key" class="item-wrap" tag="div" :to="item.url">
          <div class="complex-item" v-if="item.desc">
            <div class="item-img">
              <div class="div-img" :style="getRandomImgClz()"></div>
              <img :src="item.img" v-if="item.img">
            </div>
            <div class="item-body">
                <div class="item-title sing-ellipsis panel-item-title-color" :title="item.title">{{item.title}}</div>
                <div class="item-desc three-ellipsis" :title="item.desc">{{item.desc}}</div>
                <div class="item-bottom">
                  <div class="item-author">
                    <span class="icon iconfont renyuanguanli"></span>
                    <span>{{articleName}}</span>
                  </div>
                  <div class="item-time">
                    <span class="icon iconfont ios-shijian"></span>
                    <span>{{item.time}}</span>
                  </div>
                  <div class="item-read">
                    <span class="icon iconfont see"></span>
                    <span>{{item.readNum}}条阅读</span>
                  </div>
                  <div class="item-comment">
                    <span class="icon iconfont talk"></span>
                    <span>{{item.commentNum}}条评论</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="simple-item" v-if="!item.desc">
              <div class="simple-item-body">
                <div class="simple-item-title">
                  {{item.title}}
                </div>
                <div class="simple-item-bottom">
                  {{articleName}} {{item.time}} 阅读:{{item.readNum}} 评论:{{item.commentNum}}
                </div>
              </div>
          </div>
        </router-link>
      </div>
      <page-line :page-lines="pageList" @clickItem="clickItem"></page-line>
    </div>
  </div>
</template>
/*文章列表展示*/
<script>
  import blogKit from "../../utils/BlogKit";
  import blogApi from "../../utils/BlogApi";
  import BlogContext from "../../context/BlogContext";
  import PageLine from "../common/PageLine";

  let imgList = Array.from(Array(BlogContext.panelItemPic.length - 1), (v, k) => k).sort(() => Math.random() >= 0.5 ? 1 : -1).map((item) => 1 + item);

  export default {
    components: {PageLine},
    data: () => {
      return {
        arrList: [],
        title:"",
        pageList:[],
        pageNum:0,
        categoryId: "default",
        archiveId:"",
        tagId:"",
        articleName: BlogContext.blogName,
        categoryTitle: BlogContext.blogName + "博客",
        categorySign:BlogContext.blogSign
      }
    },
    created: function () {
      this.initCategoryBody();
    },
    methods: {
      getRandomImgClz: () => {
        let imgSrc = imgList.shift();
        imgList.push(imgSrc);
        return {
          background: "url("+BlogContext.panelItemPic[imgSrc]+") no-repeat"
        }
        return "panel-item-pic-"+imgSrc;
      },
      clickItem:function(pageNum){
        this.initCategoryBody(pageNum);
      },
      initCategoryBody: function(pageNum) {
        this.$bus.emit("fullLoadingOpen");
        this.categoryId = this.$route.params.categoryId;
        this.archiveId=this.$route.params.archiveYear?this.$route.params.archiveYear+"/"+this.$route.params.archiveMonth: undefined;
        this.tagId=this.$route.params.tagId;
        this.pageNum=pageNum;
        let promiseArr=[];
        /*设置对应值*/
        let setDataFunc=(dataList) =>  {
          this.arrList=blogKit.convertSubjectUrls(dataList.list);
          this.title=dataList.title;
          this.pageList=dataList.pageList;
          this.$bus.emit("fullLoadingClose");
        }
        /*初始化目录*/
        if(this.categoryId&&"default"!=this.categoryId){
          blogApi.loadCategoryList(this.categoryId,this.pageNum).then(setDataFunc);
        }else if(this.archiveId){
          blogApi.loadArchiveList(this.archiveId,this.pageNum).then(setDataFunc);
        }else if(this.tagId){
          blogApi.loadTagList(this.tagId,this.pageNum).then(setDataFunc);
        } else{
          blogApi.loadDefaultCategoryList(this.pageNum).then(setDataFunc);
        }
      }
    },
    name: "ArticlesBody",
    watch: {
      $route() {
        this.initCategoryBody();
      },
    },
  }
</script>

<style lang="scss">
  #category_body {
    .category-body-wrap {
      padding-bottom: 10px;
      height: 100%;
      font-size: 0;
      border-right: 1px solid #e2e8ea;
      box-sizing: border-box;
      background-color: #F6F8F9;
      .article-list-wrap {
        padding-top: 20px;
        .item-wrap:last-of-type{
        }
        .item-wrap {
          background-color: #FCFEFF;
          overflow: hidden;
          box-sizing: border-box;
          border-radius: 5px;
          margin: 0px 20px 20px;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
          .complex-item {
            .item-body {
              line-height: 1.5;
              height: 175px;
              box-sizing: border-box;
              padding: 20px 15px 15px 20px;
              display: inline-block;
              vertical-align: top;
              position: relative;
              @include categoryBodyCalWidth();
              @include deve1(){
                padding: 3px 10px 5px 12px;
                height: 100px;
              }


              .item-title {
                font-size: 22px;
                margin-bottom: 10px;
                cursor: pointer;
                @include deve1(){
                  margin-bottom: 2px;
                  font-size: 20px;
                }
              }

              .item-desc {
                line-height: 25px;
                font-size: 14px;
                color: #a2b0b7;
                cursor: pointer;
                @include deve1(){
                  -webkit-line-clamp: 2;
                  font-size: 13px;
                  line-height: 20px;
                }
              }

              .item-bottom {
                border-top: 1px solid #dee5e7;
                box-sizing: border-box;
                position: absolute;
                padding-top: 5px;
                bottom: 6px;
                left: 20px;
                right: 20px;
                overflow: hidden;
                white-space:nowrap;
                text-overflow: ellipsis;
                display: inline-block;
                @include deve1(){
                  padding-top: 1px;
                  bottom: -2px;
                  text-align: left;
                }
                .item-time, .item-read, .item-comment {
                  padding-left: 12px;
                }

                .item-author, .item-time, .item-read, .item-comment {
                  cursor: pointer;
                  color: #a2b0b7;
                  display: inline-block;
                  font-size: 12px;

                  .icon {
                    font-size: 10px;
                  }
                }
              }
            }
            .item-img {
              display: inline-block;
              vertical-align: top;

              .div-img,img {
                width: 250px;
                @include itemBodyHeight();
                border-radius: 5px 0 0 5px;
                transform: translateY(-.5px) translateX(1px);
                padding-top: .5px;
                box-sizing: border-box;
                cursor: pointer;
                background-size: 100% 100%;
                @include categoryImgWidth();
              }
            }
          }
          .simple-item{
            .simple-item-body {
              padding: 25px;
              .simple-item-title {
                color: #323232;
                cursor: pointer;
                font-size: 23px;
                font-weight: 600;
              }

              .simple-item-bottom {
                cursor: pointer;
                margin-top: 14px;
                font-size: 14px;
                color: #97979f;
              }
            }
          }
        }
      }

      .head-title {
        display: inline-block;
        width: 100%;
        padding: 11px 15px 9px 20px;
        border-bottom: 1px solid #e2e8ea;
        box-sizing: border-box;
        background-color: white;
        height: 55px;
        .title-font{
          display: inline-block;
          font-size: 22px;
          font-weight: 500;
          color: black;
          padding: 0px 0 6px 0;
        }
        .title-thumb {
          display: inline-block;
          font-size: 23px;
          color: black;
        }

        .title-sign {

          margin-left: 10px;
          display: inline-block;
          color: #98a6ad;
          font-size: 12px;
          max-width: 65%;
        }
      }
    }
  }
</style>
