<template>
  <div id="blog_bottom">
    <div class="copyright">{{copyright}}
      <span class="author-clz" @click="page">
        <span>{{detail()}}</span>
      </span>
    </div>
    <div class="technology">{{technology}}</div>
  </div>
</template>

<script>
  import BlogContext from "../../context/BlogContext";

  console.log(
    BlogContext.outPrint[0],
    BlogContext.outPrint[1],
    BlogContext.outPrint[2]
  );
  let page = BlogContext.myPage;
  let detail = BlogContext.myUrl;
  export default {
    name: "BlogBottom",
    methods: {
      page: () => {
        window.open(page);
      },
      detail: () => {
        return detail;
      }
    },
    data: () => {
      //建议这里改为 copyright 2020 博主名 theme 主题名（你博客链接）
      return {
        copyright: 'Copyright © ' + new Date().getFullYear() + ' ' + BlogContext.blogName,
        plugName: "c_blog",
        author: "cjunn",
        technology: 'Powered by vue on cnblogs',
      }
    }
  }
</script>

<style lang="scss">
  #blog_bottom {
    width: 100%;
    height: 40px;
    background-color: #edf1f2;
    border-top: 1px solid #dee5e7;
    box-sizing: border-box;
    position: absolute;
    font-size: 0px;
    line-height: 43px;
    overflow: hidden;
    white-space: nowrap;

    .copyright {
      cursor: default;
      display: inline-block;
      color: #58666e;
      font-size: 13px;

      float: left;
      line-height: 16px;
      transform: translateY(calc(50% + 6px));
      margin-left: 16px;
      @include switchHeadBar {
        margin-left: 5px;
      }


    }

    .author-clz {
      padding: 0 4px 0 4px;
      font-weight: bold;
      cursor: pointer;
      padding-bottom: 0px;
      border-bottom: 1px solid rgba(120, 120, 120, .6);
    }

    .technology {
      font-weight: 600;
      font-size: 28px;
      font-family: "黑体";
      color: #8c888b;
      background: -webkit-linear-gradient(45deg, #FF0000, #FF9900, #FFCC00, #66CC00, #00FFCC);
      color: transparent;
      -webkit-background-clip: text;
      animation: ran 10s linear infinite;
      display: inline-block;
      font-size: 15px;
      float: right;
      padding-right: 10px;
      @include switchHeadBar {
        display: none;
      }
    }

  }
</style>
