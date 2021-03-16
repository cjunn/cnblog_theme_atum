<template>
<div id="brand_title" class="head-back-color">
  <router-link :to="'/'" class="brand-title-wrap" tag="div">{{blogName}}</router-link>
</div>
</template>

<script>
    import BlogContext from "../../context/BlogContext";

    export default {
        name: "BrandTitle",
      data: () => {
        return {
          blogName:BlogContext.blogName + "博客",
        }
      }
    }
</script>

<style lang="scss">
  #brand_title{
    top: 0;
    position: absolute;
    width: 100%;
    height: $headHeight;
    z-index: 2;
    text-align: center;
    font-size: 20px;
    color:#a6a8b1;
    line-height: $headHeight;
    font-weight: bold;
    display: none;
    @include switchHeadBar(){
      display: inline-block;
    }
    .brand-title-wrap{
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;
    }
  }
</style>
