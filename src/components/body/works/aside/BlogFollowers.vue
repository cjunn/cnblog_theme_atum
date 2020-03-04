<template>
  <div id="blog_followers">
    <div class="followTitle">最新粉丝</div>
    <div class="followAreaWrap">
      <span v-for="item in followInfo.followList" class="followArea">
            <div class="followAreaItem">
              <div class="follow-avatar" @click="openBlogByAcc(item.account)" :title="item.username">
                <img :src="item.avatar">
              </div>
              <div class="follow-username" @click="openBlogByAcc(item.account)" :title="item.username">
                <span>{{item.username}}</span>
              </div>
            </div>
      </span>
    </div>
    <div class="pageArea">
      <div class="page-num" v-if="followInfo.pageInfo.pageList.length>0">
        <ul class="pagination">
          <li v-for="item in followInfo.pageInfo.pageList" @click="isNaN(item)?'':current=item">
            <a :class=" {active:item==followInfo.pageInfo.current}">{{item}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogApi from "../../../../utils/BlogApi";
    import BlogConst from "../../../../const/BlogConst";

    export default {
        name: "BlogFollowers",
        methods: {
            openBlogByAcc: (account) => {
                window.open(BlogConst.blogUrlPre + account)
            }
        },
        created: function () {
            BlogApi.loadFollowers().then((data) => {
                this.followInfo = data;
            });
        },
        data: () => {
            return {
                followInfo: {followList: [], pageInfo: {pageList: [], current: -1}},
                current: 1,
            }
        },
        watch: {
            current: function () {
                this.$bus.emit("openLoadingBar", {});
                BlogApi.loadFollowers(this.current).then((data) => {
                    this.followInfo = data;
                    this.$bus.emit("closeLoadingBar", {})
                });
            }
        }
    }
</script>

<style lang="scss">
  #blog_followers {
    .followTitle {
      margin: 15px 0px 15px 18px;
      color: #58666e;
      font-size: 15px;
    }

    .followAreaWrap {
      display: inline-block;
      position: relative;
      left: 6px;

      .followArea {
        display: inline-block;
        width: 60px;
        height: 80px;
        text-align: center;
        margin-bottom: 2px;

        .followAreaItem {
          display: inline-block;
          vertical-align: top;

          .follow-avatar {
            cursor: pointer;

            img {
              box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
              width: 48px;
              height: 48px;
              border-radius: 100%;
            }
          }

          .follow-username {
            cursor: pointer;
            padding: 3px 4px 2px 4px;
            box-sizing: border-box;
            width: 60px;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgb(100, 100, 100);
          }
        }
      }
    }


    .pageArea {
      font-size: 8px;
      text-align: center;
      margin: 5px 0 5px 0;

      a {
        padding: 4px 5px;
      }

    }
  }
</style>
