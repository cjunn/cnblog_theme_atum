<template>
  <div id="blog_tag" class="main-center-frame">
    <div class="page-head-article">
      <div>{{categoryName}} 下的文章</div>
    </div>
    <div class="post-body-head post-body-title" v-show="categoryType!='all'">
      <span class="icon iconfont home"></span>
      <span>首页</span> <span class="sep">/</span>
      <span>{{categoryName.replace("随笔分类 - ","")}}</span>
    </div>
    <div class="page-list-body">
      <div class="page-item" v-for="item in articleList">
        <router-link tag="div" :to="VUE_CTX+'/works/article/'+item.pageId">
          <div class="page-item-title">{{item.title}}</div>
          <div class="page-item-desc">
            {{item.author}} {{item.time}} 阅读:{{item.readNum}} 评论:{{item.commentNum}}
          </div>
        </router-link>
      </div>
      <div class="page-num">
        <ul class="pagination">
          <li v-for="item in pageList">
            <router-link tag="a" :to="VUE_CTX+'/works/category/'+categoryType+'/'+categoryId+'/'+item.num"
                         :class="{active:item.current}">
              {{item.text}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogApi from "../../../utils/BlogApi";


    export default {
        name: "BlogTag",
        created: function () {
            let params = this.$route.params;
            this.initBlogCategory(params.categoryId, params.page);
        },
        data: () => {
            return {
                categoryId: '',
                categoryType: '',
                page: '',
                pageList: [],
                articleList: [],
                categoryName: '',
            }
        },
        beforeRouteUpdate: function (to, from, next) {
            let params = to.params;
            this.initBlogCategory(params.categoryId, params.page);
            next();
        },
        methods: {
            initBlogCategory: function (categoryId, page) {
                let self = this;
                this.categoryId = categoryId;
                this.page = page;
                Promise.all([
                    new Promise((resolve, reject) => {
                        BlogApi.loadTagArticle(self.categoryId, self.page).then((data) => {
                            this.pageList = data.pageList;
                            this.articleList = data.list;
                            this.categoryName = data.categoryName;
                            resolve();
                        });
                    }),
                ]).then(() => {
                    setTimeout(() => {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.$bus.emit('dataedRoute', true);
                            }, 150)
                        });
                    }, 150)
                });

            },
        }
    }
</script>

<style lang="scss">
  #blog_tag {
    .page-list-body {

      .page-item:nth-last-of-type(2) {
        margin-bottom: 12px;
      }

      .page-item {
        border-radius: 5px;
        background-color: white !important;
        margin: 12px 20px 20px 20px;
        height: 100%;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
        overflow: hidden;
        padding: 18px 25px 18px 25px;
        box-sizing: border-box;
        .page-item-title {
          color: rgb(50, 50, 50);
          cursor: pointer;
          font-size: 23px;
          font-weight: 600;
        }

        .page-item-desc {
          cursor: pointer;
          margin-top: 14px;
          font-size: 14px;
          color: rgb(151, 151, 159);
        }
      }
    }
  }
</style>
