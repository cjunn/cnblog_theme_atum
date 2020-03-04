<template>
  <div id="blog_aside">
    <div class="blog-aside-oub-wrap" :class="{'blog-aside-show':asideIsShow,'blog-aside-hide':!asideIsShow}">
      <div class="blog-aside-wrap">
        <div class="blog-menu-content-wrap">
          <div class="blog-menu-content">
            <div class="blog-head-wrap" @click="foucsMe">
              <router-link :to="VUE_CTX+'/author'" tag="div">
                <img class="avatar-img" :src="avatar">
              </router-link>
              <div>
          <span class="avatar-name">
            {{avatarName()}}
            <span class="icon iconfont angeldown1"></span>
          </span>

              </div>
              <div class="avatar-sign ">
                {{avatarSign}}
              </div>
            </div>
            <div class="blog-menu-title">
              导航
            </div>
            <div class="aside-display-content">
              <router-link :to="VUE_CTX+'/works/category/all/1/1'" tag="div"
                           class="aside-display-content-item text-dark">
                <span class="icon iconfont home"></span><span>首页</span>
              </router-link>
              <div v-for="item in mainExtNav" class="aside-display-content-item" @click="openWindow(item.url)">
                <span class="icon iconfont" :class="item.icon"></span><span>{{item.title}}</span>
              </div>

            </div>
            <div class="blog-menu-title blog-menu-title-board">
              组成
            </div>
            <blog-menu-item :func-menus="funcMenus"></blog-menu-item>
          </div>
        </div>
        <div class="blog-menu-bar">
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
    <div class="blod-aside-shape" @click="asideIsShow=false"></div>
  </div>
</template>

<script>
  import BlogEncryConst from "../../const/BlogEncryConst";
  import BlogApi from "../../utils/BlogApi";
  import BlogConst from "../../const/BlogConst";
  import BlogUtils from "../../utils/BlogUtils";
  import BlogMenuItem from "./BlogMenuItem";

  let friendList = Object.assign([], BlogConst.blogFriendList);
  friendList.unshift(BlogEncryConst.myfriend);
  export default {
    name: "BlogAside",
    components: {BlogMenuItem},
    methods: {
      avatarName: () => {
        return BlogConst.blogName;
      },
      foucsMe: () => {
        BlogApi.blogFollow().then((data) => {
          BlogUtils.showInfoMsg(data);
        });
      },
      openManage: () => {
        window.open(BlogConst.manPage);
      },
      openRss: () => {
        window.open(BlogConst.subPage);
      },
      openMail: () => {
        window.open(BlogConst.sendPage);
      },
      openWindow: (url) => {
        window.open(url);
      },
    },
    created: function () {
      this.$bus.on('asideMenuPop', () => {
        this.asideIsShow = !this.asideIsShow;
      });
      BlogApi.loadAuthorHeadImg().then((img) => {
        this.avatar = img;
      });
      BlogApi.loadArticleClassify().then((data) => {
        data.forEach((e) => {
          e.to = this.VUE_CTX + '/works/category/category/' + e.id + '/1';
        })
        this.funcMenus[0].list = data;
      });
      BlogApi.loadArticleArchives().then((data) => {
        data.forEach((e) => {
          e.to = this.VUE_CTX + '/works/category/archives/' + e.id + '/1';
        })
        this.funcMenus[1].list = data;
      });
      BlogApi.loadCloudLabel().then((data) => {
        data.forEach((e) => {
          e.to = this.VUE_CTX + '/works/category/tag/' + e.id + '/1';
        })
        this.funcMenus[2].list = data;
      });
    },
    data: () => {
      return {
        'avatarSign': BlogConst.avatarSign,
        'asideIsShow': false,
        'avatar': '',
        'mainExtNav': BlogConst.mainExtNav,
        'funcMenus': [
          {
            titleName: '随笔分类',
            icon: 'menu',
            list: []
          },
          {
            titleName: '随笔档案',
            icon: 'paper',
            list: []
          },
          {
            titleName: '随笔标签',
            icon: 'label',
            list: []
          },
          {
            titleName: '常用链接',
            icon: 'pen',
            list: BlogConst.blogUsedLinks
          },
          {
            titleName: '友链',
            icon: 'links',
            list: friendList
          },
        ]
      }
    }
  }
</script>

<style lang="scss">
  $blogMenuBarHeight: 50px;
  #blog_aside {
    .blod-aside-shape {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(20, 20, 20, 0.3);
      z-index: 2;
      display: none;
    }

    .blog-aside-show {
      @include showAside();
    }

    //控制下层阴影栏隐藏
    .blog-aside-show + .blod-aside-shape {
      @include switchHeadBar {
        display: block !important;
      }
    }

    .blog-aside-hide {
      @include hideAside();
    }

    .blog-aside-oub-wrap::-webkit-scrollbar {
      display: none;
    }

    .blog-aside-oub-wrap {
      display: inline-block;
      width: $asideWidth;
      height: 100%;
      background-color: rgb(237, 241, 242);
      position: absolute;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      z-index: 3;
      color: #4e5c64;
      position: absolute;
      top: 0;
      bottom: 0;
      -webkit-transition: all 0.2s ease-out 0.1s;

      .blog-aside-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        @include switchHeadBar {
          bottom: 0;
        }

        .blog-menu-content-wrap {
          position: absolute;
          top: 0;
          bottom: $blogMenuBarHeight;
          left: 0;
          right: 0;
          z-index: 1;

          .blog-menu-content::-webkit-scrollbar {
            display: none;
          }

          .blog-menu-content {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            overflow-scrolling: touch;
            -webkit-overflow-scrolling: touch;

            .blog-head-wrap:hover {
              background: url("https://cjunn.gitee.io/c_cnblog_vue/img/body/float.gif");
              background-size: cover;
            }

            .blog-head-wrap {
              text-align: center;
              padding: 22px 0 22px 2px;
              border-bottom: 1px solid rgb(226, 232, 234);

              .avatar-img {
                width: 100px;
                height: 100px;
                border-radius: 50px;
                cursor: pointer;
                box-shadow: 2px 2px 3px #e1e1e1;
              }

              .avatar-name {
                text-align: center;
                margin-top: 8px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                margin-top: 3px;
                margin-bottom: 2px;
                display: inline-block;

                .icon {
                  font-size: 2px;
                  position: relative;
                  top: 1px;
                }
              }

              .avatar-sign {
                cursor: pointer;
                text-align: center;
                margin-top: 4px;
                color: #4e5c64;
                font-size: 12px;
              }
            }

            .blog-menu-title-board {
              padding-top: 10px;
              border-top: 1px solid #e2e8ea;
            }

            .blog-menu-title {
              color: #98a6ad;
              font-size: 12px;
              padding: 12px 12px 0px 16px;
              height: 30px;
            }


            .aside-display-content {
              .aside-display-content-item:hover {
                background-color: rgb(225, 229, 230);
              }

              .aside-display-content-item {
                cursor: pointer;
                padding: 9px 0px 9px 23px;
                font-size: 14px;

                .icon {
                  font-size: 18px;
                  margin-right: 18px;
                }

                .pad-icon {
                  margin-right: 38px;
                }

                .content-num {
                  float: right;
                  margin-right: 25px;
                  font-size: 10px !important;
                  background-color: rgb(207, 218, 221);
                  padding: 0px 6px 0px 6px;
                  border-radius: 10px;
                  text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
                  color: white;
                }

              }

            }
          }
        }

        .blog-menu-bar {
          position: absolute;
          bottom: 0;
          display: inline-block;
          width: 100%;
          height: $blogMenuBarHeight;
          display: flex;
          font-size: 12px;
          background-color: #f3f5f6;

          > div {
            cursor: pointer;
            margin-top: 6px;
            display: inline-block;
            flex: 1;
            text-align: center;
            cursor: pointer !important;
          }
        }
      }
    }
  }
</style>
