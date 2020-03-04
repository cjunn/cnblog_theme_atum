<template>
  <div id="blog_hot_page">
    <div class="menu-body-item">
      <div class="menu-body-item-title">
        <div>热门文章</div>
      </div>
      <div class="menu-body-item-content" v-for="(item,index) in hotArticles">
        <router-link class="item-icon icon-unify-style"
                     :style="{background:'url('+(picIcon(index))+')'}"
                     :to="VUE_CTX+'/works/article/'+item.pageId" tag="div">
        </router-link>
        <div class="item-content">
          <router-link class="item-cont-wrap double-ellipsis"
                       :to="VUE_CTX+'/works/article/'+item.pageId"
                       tag="div">
            {{item.name}}
          </router-link>
          <div class="item-see">
            <span class="icon iconfont see"></span>
            <span>{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogKit from "../../../../utils/BlogKit";
    import BlogApi from "../../../../utils/BlogApi";

    export default {
        name: "BlogHotPage",
        created: function () {
            BlogApi.loadHotArticle().then((data) => {
                this.hotArticles = data;
            })
        },
        methods: {
            picIcon: (index) => {
                return BlogKit.getExtendStylePath("/img/menuIcon/menuicon-" + index + ".png");
            }
        },
        data: () => {
            return {
                hotArticles: []
            }
        }
    }
</script>

<style lang="scss">
  $picIconWidth: 45px;
  #blog_hot_page {
    .menu-body-item {
      padding: 15px 15px 0px 18px;

      .menu-body-item-title {
        margin-bottom: 15px;
        color: rgb(88, 102, 110);
        font-size: 15px;
      }


      .menu-body-item-content:nth-of-type(n) {
        margin-bottom: 20px;
      }


      .icon-unify-style {
        background-size: cover !important;
        width: $picIconWidth;
        height: $picIconWidth;
        display: inline-block;
        border-radius: 25px;
        vertical-align: top;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
        cursor: pointer;
      }

      .menu-body-item-content {
        font-size: 0;
        position: relative;

        .item-cont-body {
          margin: 2px 0 2px 0;
        }

        .item-cont-right {
          float: right;
        }

        .item-icon {

        }

        .item-content {
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          width: calc(100% - #{$picIconWidth});
          padding-left: 9px;
          font-size: 0px;
          padding-right: 1px;

          .item-cont-wrap {
            color: rgb(88, 102, 110);
            font-size: 12.5px;
            cursor: pointer;
          }

          .item-see {
            margin-top: 2px;

            .see {
              margin-right: 3px;
            }

            span {
              color: rgb(152, 166, 173);
              font-size: 8px;
            }
          }
        }
      }
    }
  }
</style>
