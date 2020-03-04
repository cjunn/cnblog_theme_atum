<template>
  <div id="blog_name">
    <span class="author-icon icon iconfont menu"
          @click="switchAsideMenuPop()"
    ></span>
    <span class="home-icon"> <span class="icon iconfont home"></span></span>
    <router-link :to="VUE_CTX+'/author'" class="blog-name" tag="span">{{blogName}}</router-link>
  </div>
</template>

<script>
    import BlogConst from "../../const/BlogConst";

    export default {
        name: "BlogName",
        created: function () {
            this.$on("asideMenuPop", function (isPopMenu) {
            });
        },
        methods: {
            switchAsideMenuPop: function () {
                this.$bus.emit('asideMenuPop', true);
            }
        },
        data: () => {
            return {
                "blogName": BlogConst.blogName + "博客"
            }
        }

    }
</script>

<style lang="scss">
  #blog_name {
    vertical-align: top;
    display: inline-block;
    width: $asideWidth;
    text-align: center;
    transform: translateX(-8px);
    color: rgba(234, 235, 237, 0.98);
    font-size: 0;
    overflow: hidden;
    height: $headHeight;
    @include switchHeadBar {
      text-align: left;
      width: 100%;
    }

    .home-icon {
      @include switchHeadBar {
        display: none !important;
      }

      .iconfont {
        font-size: 21px;
        cursor: pointer;
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
    }

    .author-icon {
      display: none;
      @include switchHeadBar {
        padding: 0 18px 0 25px;
        display: inline-block;
        cursor: pointer;
        color: #a6a8b1;
      }
    }

    .author-icon:hover {
      color: #e9eaec;
      background-color: #32374a;
    }

    .blog-name {
      font-weight: bold;
      font-size: 19px;
      cursor: pointer;
      @include switchHeadBar {
        position: absolute !important;
        left: 80px;
        right: 80px;
        text-align: center;
        margin-left: 20px;
      }
    }
  }
</style>
