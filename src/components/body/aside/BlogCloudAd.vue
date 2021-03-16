<template>
    <div id="blog_cloud_ad">
        <div class="pub-body-title">福利区</div>
        <div v-html="adDisplay"></div>
    </div>
</template>

<script>
  import BlogContext from "../../../context/BlogContext";
    export default {
        name: "BlogCloudAd",
        data: () => {
        return {
          adDisplay: BlogContext.adDisplay,
        }
      }
    }
</script>

<style lang="scss">
  #blog_cloud_ad{
    padding: 0 5px;
    .pub-body-title{
      margin-bottom: 2px !important;
    }
    .blog-cloud-ad-item{
      padding: 5px 0;
      img{
        width: 100%;
        cursor: pointer;
      }
    }
  }
</style>
