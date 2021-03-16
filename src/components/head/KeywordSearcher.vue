<template>
  <div id="keyword_searcher">
    <div class="keyword-searcher-wrap head-back-color">
        <input class="input-wrap head-keyword-back-color" placeholder="输入关键字查询" @focus="isShow=true"/>
        <div class="search-btn head-keyword-back-color">
          <span class="icon iconfont -search"></span>
        </div>
    </div>
    <div class="keyword-searcher-shade head-back-color">sssssssssss</div>
    <transition name="trans">
      <pop-list class="pop-list" :pop-list="[{key:'暂不支持该接口'}]" v-show="isShow"></pop-list>
    </transition>
  </div>
</template>

<script>
    import PopList from "./PopList";
    import blogUtils from "../../utils/BlogUtils";
    export default {
        name: "KeywordSearcher",
        components: {PopList},
      data: () => {
        return {
          isShow:false,
        }
      },
      mounted:function(){
        blogUtils.registerUnClick("#keyword_searcher",()=>{
          this.isShow=false;
        });
      }
    }
</script>

<style lang="scss">
  #keyword_searcher:before{
    content: "";
    height: 1px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 4;
    background-color: rgba(20,20,20,.1);
  }
  #keyword_searcher {
      vertical-align: top;
      display: inline-block;
      width: 263px;
      height: $headHeight;
      position: relative;
      box-sizing: border-box;
      @include switchHeadBar(){
        width: 100%;
        text-align: center;

        z-index: 2;

      }
      .trans-enter-active, .trans-leave-active {
        transition: all .24s ease-in-out 0s;
      }
      .trans-enter, .trans-leave-to{
        transform: translateY(-100%);
      }

      .pop-list{
        position: absolute;
        z-index: 1;
      }
      .keyword-searcher-shade{
        position: absolute;
        left: -4px;
        right: -4px;
        top: 0;
        bottom: 0;
        z-index: 2;
      }
      .keyword-searcher-wrap{
        z-index: 3;
        padding: 10px 0 10px 0;
        height: 100%;
        box-sizing: border-box;
        font-size: 0px;
        position: relative;
        .search-btn{
          display: inline-block;
          position: relative;
          height: 100%;
          border-radius: 0px 25px 25px 0px;
          padding: 0px 13px 0px 13px;
          cursor: pointer;
          .-search{
            display: inline-block;
            padding-top: 9px;
          }
         }
        .search-btn:hover{
          .-search{
            color:black;
          }
        }
        .input-wrap{
            width: 220px;
            display: inline-block;
            vertical-align: top;
            height: 100%;
            border-radius: 25px 0 0 25px;
            border: 0;
            margin: 0;
            padding: 10px 5px 8px 16px;
            box-sizing: border-box;
            outline: none;
            font-size: 11px;
            @include switchHeadBar(){
              width: 85%;
            }
        }
        .input-wrap:focus{
          background-color: white;
        }

      }
  }
</style>
