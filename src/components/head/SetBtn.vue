<template>
  <div id="set_btn" class="head-back-color">
    <div class="set-btn-out-wrap">
    <div class="set-btn-wrap" @click="openManagerView">
        <span>设置</span>
        <span class="icon iconfont angeldown1"></span>
    </div>
    </div>
  </div>
</template>

<script>
  import BlogContext from "../../context/BlogContext";
    export default {
        name: "SetBtn",
        methods:{
          openManagerView:()=>{
            window.open(BlogContext.manPage)
          }
        }
    }
</script>

<style lang="scss">
  #set_btn{
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 80px;
    font-size: 0px;
    overflow: hidden;
    height: $headHeight;
    z-index: 2;
    @include switchHeadBar(){
      text-align: left;
      width: 100%;
      z-index: -1;
    }
    .set-btn-out-wrap:hover{
      background-color: rgba(0,0,0,.12);
      color: rgba(240, 240, 240, .9);
    }
    .set-btn-out-wrap {
      width: 100%;
      height: 100%;
      cursor: pointer;
      .set-btn-wrap {
        height: 100%;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        line-height: $headHeight;
        width: 80px;
        color: #a6a8b1;

        .angeldown1 {
          padding-left: 6px;
          font-size: 13px;
        }
      }
    }
  }
</style>
