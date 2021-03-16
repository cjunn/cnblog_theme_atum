<template>
    <div id="article_pre_pos">
      <router-link class="post-turning-pre" tag="div" :to="VUE_CTX+'/subject/p/'+prePos.preId+'.html'" v-if="prePos.preId">上一篇</router-link>
      <router-link class="post-turning-pos" tag="div" :to="VUE_CTX+'/subject/p/'+prePos.posId+'.html'" v-if="prePos.posId">下一篇</router-link>
    </div>
</template>

<script>
    import utils from "../../../utils/BlogUtils";
    import blogApi from "../../../utils/BlogApi";

    export default {
      props: {
        articleId: {
          default: -1,
        },
      },
      data: () => {
        return {
          prePos:{}
        }
      },
      name: "ArticlePrePos",
      methods: {
        initPrePos: function () {
          blogApi.loadPrevnext(this.articleId).then((res)=>{
            this.prePos=res;
          });
        },
      },
      created:function() {
        this.initPrePos();
      },
      watch: {
        articleId: function () {
            this.initPrePos();
        },
      },
    }
</script>

<style lang="scss">
  #article_pre_pos{
    font-size: 15px;
    .post-turning-pre, .post-turning-pos {
      display: inline-block;
      background-color: white;
      box-shadow: 1px 1px 2px rgba(80, 80, 80, .2);
      border-radius: 10px;
      cursor: pointer;
      border: 1px solid rgba(240, 240, 240, .8);
      padding: 5px 8px 5px 8px;
      font-size: 12px;
      color: rgb(86, 104, 114);
    }
    .post-turning-pos{
      float: right;
    }
  }

</style>
