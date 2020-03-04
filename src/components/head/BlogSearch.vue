<template>
  <div id="blog_search">
    <div class="search-input-wrap">
      <input type="text" placeholder="输入关键字查询..." class="input-wrap" @input="inputKeyword"
             @propertychange="inputKeyword" @click="isDialog=true" v-model="keyword">
      <div class="input-icon">
        <span class="icon iconfont -search" v-show="!isLoading"></span>
        <span class="loading-clz" v-show="isLoading">
          <div class="load5">
            <div class="loader">Loading...</div>
          </div>
        </span>
      </div>
    </div>
    <div class="search-dialog-wrap small-base-scroll "
         :class="{ 'search-dialog-show': isDialog,'search-dialog-hide':!isDialog}">
      <div v-for="item in list" class="search-item">
        <router-link :to="VUE_CTX+'/works/article/'+item.pageId" tag="div" v-if="item.pageId">
          <div class="search-title ellipsis-title" v-html="item.title">{{item.title}}</div>
          <div class="search-content ellipsis-content" v-html="item.content">{{item.content}}</div>
        </router-link>
        <div v-if="!item.pageId">
          <div class="search-title ellipsis-title" v-html="item.title">{{item.title}}</div>
          <div class="search-content ellipsis-content" v-html="item.content">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogApi from "../../utils/BlogApi";
    import BlogUtils from "../../utils/BlogUtils";

    export default {
        name: "BlogSearch",
        created: function () {
            let self = this;
            BlogUtils.registerUnClick("#blog_search", () => {
                self.isDialog = false;
            });
        },
        methods: {
            inputKeyword: function (event) {
                this.isLoading = true;
                BlogApi.loadBlogSearch(this.keyword).then((data) => {
                    this.isLoading = false;
                    if (data.cnList.length > 0) {
                        this.list = data.cnList;
                    } else {
                        this.list = this.defList;
                    }
                    this.isDialog = true;
                });
            }
        },
        data: () => {
            return {
                isLoading: false,
                keyword: '',
                isDialog: false,
                defList: [
                    {
                        url: '',
                        title: '',
                        content: '查无数据',
                    }
                ],
                list: [
                    {
                        url: '',
                        title: '',
                        content: '查无数据',
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
  $searchWidth: 260px;
  $iconWidth: 40px;
  $searchBackColor: rgba(234, 235, 237, 0.98);
  #blog_search {
    vertical-align: top;
    display: inline-block;

    @include switchHeadBar {
      width: 100%;
      text-align: center;
      border-top: 1px solid rgba(52, 56, 72, 1);
      background-color: $headBackColor;
      padding-bottom: 10px;
    }

    .search-input-wrap {
      vertical-align: top;
      width: $searchWidth;
      height: 30px;
      position: relative;
      top: 10px;
      @include switchHeadBar {
        width: auto;
        padding: 0px 30px 10px 30px;
        z-index: 3;
      }

      .input-wrap:focus {
        background-color: white;
      }

      .input-wrap {

        font-size: 8px;
        vertical-align: top;
        display: inline-block;
        width: calc(100% - #{$iconWidth});
        height: 100%;
        background-color: $searchBackColor;
        float: left;
        border-radius: 25px 0 0 25px;
        box-sizing: border-box;
        vertical-align: top;
        padding: 3px 4px 0 18px;
        color: rgb(153, 153, 153);
      }


      .input-icon:hover {
        color: black;
      }

      .input-icon {
        color: rgb(58, 63, 81);
        cursor: pointer;
        vertical-align: top;
        display: inline-block;
        width: $iconWidth;
        height: 100%;
        background-color: $searchBackColor;
        border-radius: 0 25px 25px 0;
        text-align: center;

        .iconfont {
          position: relative;
          top: -9px;
          left: -1px;
        }

        .loading-clz {
          position: relative;
          top:9px;
          left:-2px;
          cursor: pointer;
          .load5 {
            display: inline-block;
          }

          .load5 .loader {
            display: inline-block;
            font-size: 5px;
            transform: scale(0.25);
            width: 1em;
            height: 1em;
            border-radius: 50%;
            position: relative;
            text-indent: -9999em;
            -webkit-animation: load5 1.1s infinite ease;
            animation: load5 1.1s infinite ease;
          }

          @-webkit-keyframes load5 {
            0%,
            100% {
              box-shadow: 0em -2.6em 0em 0em rgb(58, 63, 81), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.5), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.7);
            }
            12.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.7), 1.8em -1.8em 0 0em rgb(58, 63, 81), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.5);
            }
            25% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.5), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.7), 2.5em 0em 0 0em rgb(58, 63, 81), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            37.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.5), 2.5em 0em 0 0em rgba(58, 63, 81, 0.7), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            50% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.5), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.7), 0em 2.5em 0 0em rgb(58, 63, 81), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            62.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.5), 0em 2.5em 0 0em rgba(58, 63, 81, 0.7), -1.8em 1.8em 0 0em rgb(58, 63, 81), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            75% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.5), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.7), -2.6em 0em 0 0em rgb(58, 63, 81), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            87.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.5), -2.6em 0em 0 0em rgba(58, 63, 81, 0.7), -1.8em -1.8em 0 0em rgb(58, 63, 81);
            }
          }
          @keyframes load5 {
            0%,
            100% {
              box-shadow: 0em -2.6em 0em 0em rgb(58, 63, 81), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.5), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.7);
            }
            12.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.7), 1.8em -1.8em 0 0em rgb(58, 63, 81), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.5);
            }
            25% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.5), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.7), 2.5em 0em 0 0em rgb(58, 63, 81), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            37.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.5), 2.5em 0em 0 0em rgba(58, 63, 81, 0.7), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            50% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.5), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.7), 0em 2.5em 0 0em rgb(58, 63, 81), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.2), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            62.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.5), 0em 2.5em 0 0em rgba(58, 63, 81, 0.7), -1.8em 1.8em 0 0em rgb(58, 63, 81), -2.6em 0em 0 0em rgba(58, 63, 81, 0.2), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            75% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.5), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.7), -2.6em 0em 0 0em rgb(58, 63, 81), -1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2);
            }
            87.5% {
              box-shadow: 0em -2.6em 0em 0em rgba(58, 63, 81, 0.2), 1.8em -1.8em 0 0em rgba(58, 63, 81, 0.2), 2.5em 0em 0 0em rgba(58, 63, 81, 0.2), 1.75em 1.75em 0 0em rgba(58, 63, 81, 0.2), 0em 2.5em 0 0em rgba(58, 63, 81, 0.2), -1.8em 1.8em 0 0em rgba(58, 63, 81, 0.5), -2.6em 0em 0 0em rgba(58, 63, 81, 0.7), -1.8em -1.8em 0 0em rgb(58, 63, 81);
            }
          }


        }
      }
    }

    .search-dialog-hide {
      transform: translate(0, -100%) !important;
      @include switchHeadBar {
        transform: translate(0, -25px) !important;
        max-height: 0px !important;
      }
    }

    .search-dialog-show {
      transform: translate(0, 0) !important;
    }

    .search-dialog-wrap {
      position: absolute;
      width: 380px;
      max-height: 350px;
      box-shadow: 0 0px 5px rgba(0, 0, 0, .3);
      overflow-y: scroll;
      background-color: white;
      -webkit-transition: all 0.3s ease-in-out 0s;
      line-height: normal;
      padding: 5px 0 5px 0;
      top: $headHeight;
      z-index: -1;
      @include switchHeadBar {
        z-index: 2;
        top: auto;
        margin-top: 4px;
        left: 45px;
        width: calc(100% - 90px);
        max-height: 300px;
        text-align: left;
      }

      .search-item:hover {
        background-color: rgb(237, 241, 242);
      }

      .search-item {
        padding: 5px 15px 5px 15px;
        cursor: pointer;

        .ellipsis-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        .ellipsis-content {
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .search-title {
          font-size: 14px;
          color: black;

          a {
            text-decoration: none;
            color: #333;
          }
        }

        .search-content {
          font-size: 13px;
          color: gray;
          margin-top: 5px;
          font-size: 13px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
