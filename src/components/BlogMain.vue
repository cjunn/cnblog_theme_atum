<template>
  <div class="blog-main" :style="imgStyle">
    <blog-panel class="blog-panel-wrap"></blog-panel>
  </div>
</template>

<script>
    import BlogKit from "../utils/BlogKit";
    import BlogPanel from "./BlogPanel";
    import BlogConst from "../const/BlogConst";
    export default {
        created: () => {
        },
        name: "BlogMain",
        components: {BlogPanel},
        data: () => {
            return {
                imgStyle: {
                    background: 'url(' + BlogConst.bigBackImg + ') rgb(248, 248, 255)'
                }
            }
        }
    }
</script>

<style lang="scss">
  .blog-main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: 100% auto;
    overflow: hidden;
    .blog-panel-wrap {
      position: absolute;
      z-index: 2;
      box-shadow: 0 0 30px rgba(0, 0, 0, .3);
    }


  }
</style>
