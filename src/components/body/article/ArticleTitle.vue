<template>
    <div id="article_title">
      <div class="article-page-head-wrap">
        <div class="author-title">
          <span>{{articleInfo.title}}</span>
          <span class="fangdabtn icon iconfont fangda" @click="$emit('openFullScreenEven')"></span>
        </div>
        <div class="author-sign">
          <span>
            <span class="icon iconfont renyuanguanli"></span>
            <span>{{articleName}}</span>
          </span>
          <span>
            <span class="icon iconfont ios-shijian"></span>
            <span>{{articleInfo.time}}</span>
          </span>
          <span>
            <span class="icon iconfont see"></span>
            <span>{{articleInfo.viewCount}}</span>
            <span>次浏览</span>
          </span>
          <span>
            <span class="icon iconfont talk"></span>
            <span>{{articleInfo.commentCount}}</span>
            <span>条评论</span>
          </span>
          <span>
            <span class="icon iconfont pen"></span>
            <span>{{articleInfo.fontNum}}</span>
            <span>字数</span>
          </span>
          <span>
            <span class="icon iconfont label"></span>
            <span>
              <span v-for="item in articleInfo.articleLabels" class="label-item">
                <span class="">{{item.title}}</span>
              </span>
            </span>
          </span>
        </div>

      </div>
    </div>
</template>

<script>
    import BlogContext from "../../../context/BlogContext";

    export default {
        props: {
          articleInfo: {
            type: Object,
          },
        },
        data: () => {
          return {articleName: BlogContext.blogName}
        },
        name: "ArticleTitle",
        methods: {

        }
    }
</script>

<style lang="scss">
  #article_title {
    .article-page-head-wrap {
      border-bottom: 1px solid #e2e8ea;
      padding: 18px 15px 22px 22px;
      background-color: #fff;

      .author-title {
        font-size: 22px;
        margin-bottom: 15px;
        .fangdabtn{
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .author-sign {
        margin-top: 6px;
        color: rgb(152, 166, 173);
        font-size: 12px;

        > span {
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
  }
</style>
