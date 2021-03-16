<template>
  <div id="beer_list" class="head-back-color">
    <div class="beer-list-wrap">
      <div class="beer-wrap head-back-color" @click="showPop=!showPop">
        <div class="beer-inner-wrap">
          <span class="icon iconfont bell"></span>
        </div>
      </div>
      <transition name="trans">
        <pop-list :pop-list="beerList" class="pop-list" v-show="showPop" pop-title="闲言碎语"></pop-list>
      </transition>
      </div>
  </div>
</template>

<script>
    import PopList from "./PopList";
    import blogUtils from "../../utils/BlogUtils";
    import blogApi from "../../utils/BlogApi";
    export default {
      data: () => {
        return {
          showPop:false,
          beerList:[]
        }
      },
      name: "BeerList",
      components: {PopList},
      mounted:function() {
        blogUtils.registerUnClick("#beer_list", () => {
          this.showPop = false;
        });
        blogApi.loadBlogTalkShort().then((res)=>{
          res.each((i,item)=>{
            this.beerList.push({
              key:item.desc,
              val:item
            })
          });
         /* this.beerList=res.map((item)=>{
            return {key:item.desc,val:item}
          });*/
        });
      }
    }
</script>

<style lang="scss">
  #beer_list:before,#beer_list:after{
    content: "";
    height: 1px;
    position: absolute;
    left: 0px;
    right: 0px;
    z-index: 1;
    background-color: rgba(20,20,20,.1);
  }
  #beer_list:after{
    bottom: 0px;
    z-index: 1;
  }
  #beer_list:before{
    z-index: 2;
    top: 0px;
  }
  #beer_list{
    display: inline-block;
    height: $headHeight;
    width: $headHeight;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    box-sizing: border-box;

    @include switchHeadBar(){
      width: 100%;

      text-align: left;
      height: $headHeight;
    }

    .beer-list-wrap {
      width: 100%;
      height: 100%;
      position: absolute;

      .beer-wrap {
        width: $headHeight;
        height: 100%;
        line-height: $headHeight;
        text-align: center;
        font-weight: bold;
        color: #a6a8b1;
        position: absolute;
        z-index: 1;
        @include switchHeadBar(){
          width: 100%;
          text-align: left;
        }
        .beer-inner-wrap:hover {
          background-color: rgba(0, 0, 0, .12);
          color: rgba(240, 240, 240, .9);
        }
        .beer-inner-wrap{
          height: $headHeight;
          overflow: hidden;
          @include switchHeadBar(){
            width: 100%;
            padding-left: 25px;
          }
        }
      }

      .pop-list {
        position: absolute;
        left: -134px;
        width: 260px;
        z-index: 0;
        top: $headHeight;
        @include switchHeadBar(){
          width: 100%;
          left: 0;
          z-index: 0;
        }
      }


      .trans-enter-active, .trans-leave-active {
        transition: all .24s ease-in-out 0s;
      }

      .trans-enter, .trans-leave-to {
        transform: translateY(-100%);
      }
    }
  }

</style>
