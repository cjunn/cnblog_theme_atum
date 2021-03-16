<template>
  <div id="blog_head_bar" class="head-back-color" ref="blogHeadBar" :style="{height:minShowSet?'250px':'50px'}">
    <brand-title class="brand-title"></brand-title>
    <brand-name></brand-name>
    <min-set-btn class="min-set-btn" @clickSet="switchSetView"></min-set-btn>
    <keyword-searcher class="keyword-searcher"></keyword-searcher>
    <div class="float-right-wrap">
      <music-player class="music-player"></music-player>
      <beer-list class="beer-list"></beer-list>
      <set-btn class="set-btn"></set-btn>
    </div>
  </div>
</template>

<script>
  import BrandName from "./BrandName";
  import KeywordSearcher from "./KeywordSearcher";
  import MusicPlayer from "./MusicPlayer";
  import BeerList from "./BeerList";
  import SetBtn from "./SetBtn";
  import MinSetBtn from "./MinSetBtn";
  import BrandTitle from "./BrandTitle";
  import $ from "jquery";
  export default {
    name: "BlogHeadBar",
    data: () => {
      return {
        minShowSet:false,
      }
    },
    mounted: function () {
      let self=this;
      function resetHeadView(){
        $(self.$refs.blogHeadBar).css('overflow',$(window).width()<900?'hidden':'');
        self.minShowSet=false;
      }
      resetHeadView();
      $(window).resize((e)=>{resetHeadView()});
      this.$refs.blogHeadBar.addEventListener('transitionstart',(e)=>{
        $(e.target).css('overflow','hidden');
      });
      this.$refs.blogHeadBar.addEventListener('transitionend',(e)=>{
        if($(e.target).height()=='250'){
          $(e.target).css('overflow','');
        }
      });
    },
    computed: {

    },
    components: {BrandTitle, MinSetBtn, SetBtn, BeerList, MusicPlayer, KeywordSearcher, BrandName},
    methods:{
      switchSetView:function(){
        setTimeout(()=>{
          this.minShowSet=!this.minShowSet;
        },this.minShowSet&&$("#blog_head_bar .pop-list").is(":visible")?300:0);
      }
    }
  }
</script>

<style lang="scss">
  #blog_head_bar {
    position: relative;
    z-index: 100;
    transition: all 0.4s ease 0s;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,.05);
    .float-right-wrap {
      height: 100%;
      float: right;
      @include switchHeadBar(){
        height: 0px;
        float: none;
        z-index: -1;
        position: absolute;
        width: 100%;
      }
    }
  }
</style>
