<template>
  <div id="panel_aside" class="panel-aside-back-color">
    <div class="panel-aside-wrap none-base-scroll">
      <avatar-area></avatar-area>
      <menu-items menu-identify="1" menu-title="导航" :menu-list="mainExtNav"></menu-items>
      <menu-items menu-identify="2" menu-title="组成" :menu-list="funcMenuNav"></menu-items>
    </div>
    <div class="panel-aside-bottom">
      <div class="blog-menu-bar panel-aside-color">
        <div @click="openManage">
          <div class="icon iconfont cogs"></div>
          <div>管理</div>
        </div>
        <div @click="openRss">
          <div class="icon iconfont rss"></div>
          <div>文章</div>
        </div>
        <div @click="openMail">
          <div class="icon iconfont talk"></div>
          <div>联系</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  /*面板侧边控件*/
  import AvatarArea from "./AvatarArea";
  import MenuItems from "./MenuItems";
  import BlogContext from "../../context/BlogContext";
  import blogApi from "../../utils/BlogApi";
  import blogKit from "../../utils/BlogKit";
  let friendList = Object.assign([{title:'C君博客',url:'https://www.cnblogs.com/cjunn/'}], BlogContext.blogFriendList);
  export default {
    name: "PanelAside",
    components: {MenuItems, AvatarArea},
    data: () => {
      return {
        mainExtNav: BlogContext.mainExtNav,
        funcMenuNav: [],

      }
    },
    methods:{
      openManage: () => {
        window.open(BlogContext.manPage);
      },
      openRss: () => {
        window.open(BlogContext.subPage);
      },
      openMail: () => {
        window.open(BlogContext.sendPage);
      },
    },
    created: function () {
      blogApi.loadSideColumn().then((data) => {
        this.funcMenuNav.push({
          title: '随笔分类',
          icon: 'menu',
          children: blogKit.convertSubjectUrls(data.catListPostCategory)
        }, {
          title: '随笔档案',
          icon: 'paper',
          children: blogKit.convertSubjectUrls(data.catListPostArchive)
        }, {
          title: '随笔标签',
          icon: 'label',
          children: blogKit.convertSubjectUrls(data.catListTag)
        }, {
          title: '常用链接',
          icon: 'pen',
          children: data.catListLink
        }, {
          title: '友链',
          icon: 'links',
          children: friendList
        })
      })
    }

  }
</script>

<style lang="scss">
  #panel_aside {
    width: 100%;
    height: 100%;
    position: relative;

    .panel-aside-wrap {
      position: absolute;
      top: 0;
      bottom: $headHeight;
      overflow-y: scroll;
      width: 100%;
    }

    .panel-aside-bottom {

      position: absolute;
      bottom: 0px;
      height: $headHeight;
      width: 100%;

      .blog-menu-bar {
        padding-top: 5px;
        display: flex;
        font-size: 12px;
        position: relative;
        > div {
          cursor: pointer;
          margin-top: 6px;
          display: inline-block;
          flex: 1;
          text-align: center;
        }
      }
    }
  }
</style>
