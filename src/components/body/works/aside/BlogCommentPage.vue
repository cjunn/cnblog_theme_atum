<template>
  <div id="blog_comment_page">

    <div class="menu-body-item">
      <div class="menu-body-item-title">
        <div>最新评论</div>
      </div>
      <div>
        <div class="menu-body-item-content" v-for="(item,index) in comments">
          <router-link class="item-icon icon-unify-style"
                       :style="{background:'url('+(item.avatar)+')'}"
                       :to="VUE_CTX+'/works/article/'+item.pageId+'?anchor='+item.anchor"
                       tag="div">
          </router-link>

          <div class="item-content">
            <router-link class="item-cont-wrap sing-ellipsis"
                         :to="VUE_CTX+'/works/article/'+item.pageId+'?anchor='+item.anchor"
                         tag="div">
              {{item.title}}
            </router-link>
            <router-link class="item-cont-wrap double-ellipsis item-cont-body"
                         :to="VUE_CTX+'/works/article/'+item.pageId+'?anchor='+item.anchor"
                         tag="div">
              <span class="item-body-wrap" v-html="item.body">
                  {{item.body}}
              </span>
            </router-link>
            <router-link class="item-cont-wrap double-ellipsis item-cont-right"
                         :to="VUE_CTX+'/works/article/'+item.pageId+'?anchor='+item.anchor"
                         tag="div">
              {{item.owner}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import emoji from "../../../../utils/EmojiUtils";
    import BlogKit from "../../../../utils/BlogKit";
    import BlogApi from "../../../../utils/BlogApi";

    export default {
        name: "BlogCommentPage",
        created: function () {
            BlogApi.loadLastComment().then((data) => {
                data.forEach((e) => {
                    e.body = emoji.parseText(e.body);
                });
                this.comments = data;
            })
        },
        methods: {
            picIcon: (index) => {
                return BlogKit.getExtendStylePath("/img/menuIcon/menuicon-" + index + ".png");
            }
        },
        data: () => {
            return {
                comments: []
            }
        }
    }
</script>

<style lang="scss">
  $picIconWidth: 45px;
  #blog_comment_page {
    .menu-body-item {
      font-size: 0px;
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
        font-size: 13px;

        .item-cont-body {
          margin: 2px 0 2px 0;
        }

        .item-cont-right {
          float: right;
        }

        .item-content {
          display: inline-block;
          vertical-align: top;
          width: calc(100% - #{$picIconWidth} - 5px);
          box-sizing: border-box;
          padding-left: 9px;

          .item-cont-wrap {
            color: rgb(88, 102, 110);
            font-size: 12.5px;
            cursor: pointer;

            .item-body-wrap {
              color: rgb(152, 166, 173);
            }
          }

        }
      }
    }
  }

</style>
