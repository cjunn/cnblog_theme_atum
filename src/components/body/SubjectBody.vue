<template>
  <div id="route_body">
    <router-view ref="routeView" class="inner-route-body" :style="{ maxHeight: leftHeight + 'px' }"></router-view>
    <pub-aside ref="pubAside" class="pub-aside" :style="{ maxHeight: rightHeight + 'px' }"></pub-aside>
  </div>

</template>

<script>
  import ArticlesBody from "./CategoryBody";
  import PubAside from "./aside/PubAside";

  export default {
    name: "RouteBody",
    components: {ArticlesBody, PubAside},
    mounted:function(){
    },
    data: () => {
      return {
        leftHeight: '',
        rightHeight: ''
      }
    },
    methods:{

      resetView:function(){
        return;
        let left=this.$refs.routeView.$el.clientHeight;
        let right=this.$refs.pubAside.$el.clientHeight;
        if(left>right){
          right=left;
        }else{
          left=right;
        }
        this.rightHeight=right;
        this.leftHeight=left;
      }
    }
  }
</script>

<style lang="scss">
  #route_body {
    position: relative;
    .inner-route-body {
      display: inline-block;
      width: 922px;
      vertical-align: top;
      position: relative;
      @include worksBodyWidth();
    }
    .pub-aside {
      @include deve4() {
        display: none;
      }
      @include switchHeadBar(){
        display: none;
      }
      display:inline-block;
      width: 248px;
      vertical-align: top;
      position: relative;
      border-left: 1px solid #e2e8ea;
      box-sizing: border-box;
      left: -1px;
    }
  }
</style>
