<template>
  <div :class="themeStyle()" >
    <div id="app" class="body-pic" :style="bgImg()">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import BlogContext from "./context/BlogContext";
  import "./assets/css/theme/style0.scss";
  import "./assets/css/theme/style1.scss";
  export default {
    name: 'App',
    data: () => {
      return {

      }
    },
    methods:{
      themeStyle:()=>{
        return BlogContext.themeStyle
      },
      bgImg:()=>{
        return {
          background: "url("+BlogContext.bigBackImg+") 0% 0% / 100% 100% rgb(248, 248, 255)"
        }
      }
    }
  }
</script>

<style lang="scss">
  #app {
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
</style>
